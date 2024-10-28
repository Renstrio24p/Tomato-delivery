import { createContext, FC, useEffect, useState } from "react";
import { FoodItem, Props, StoreContextValue } from "./types/Context";
import axios from "@/server/api/axios";
import { useQuery } from "@tanstack/react-query";

// Helper functions for safe storage access
const safeGetItem = (storageType: Storage, key: string) => {
  if (typeof window !== "undefined") {
    return storageType.getItem(key);
  }
  return null;
};

const safeSetItem = (storageType: Storage, key: string, value: string) => {
  if (typeof window !== "undefined") {
    storageType.setItem(key, value);
  }
};

const safeRemoveItem = (storageType: Storage, key: string) => {
  if (typeof window !== "undefined") {
    storageType.removeItem(key);
  }
};

// Create the context with a default value
export const storeContext = createContext<StoreContextValue | null>(null);

const StoreContextProvider: FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useState<{ [key: string]: number }>({});
  const [showLinks, setShowLinks] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch the food list using useQuery, but only if token exists
  const { data, error, isLoading } = useQuery({
    queryKey: ["foodList", token],
    queryFn: async () => {
      const response = await axios.get("/api/food/list", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status !== 200) {
        throw new Error(`Error fetching food list: ${response.status}`);
      }
      return response.data.data;
    },
    refetchOnWindowFocus: false,
  });

  // Initialize token, cartItems, and userData from storage on mount
  useEffect(() => {
    if (isMounted) {
      const storedToken = safeGetItem(localStorage, "token");
      const storedCartItems = safeGetItem(sessionStorage, "cartItems");
      const storedUserData = safeGetItem(sessionStorage, "userData");

      if (storedCartItems) setCartItems(JSON.parse(storedCartItems));
      if (storedToken) setToken(storedToken);
      if (storedUserData) setUserData(JSON.parse(storedUserData));
    }
  }, [isMounted]);

  // Update session storage whenever cartItems or userData changes
  useEffect(() => {
    if (isMounted) {
      safeSetItem(sessionStorage, "cartItems", JSON.stringify(cartItems));
      safeSetItem(sessionStorage, "userData", JSON.stringify(userData));
    }
  }, [cartItems, userData, isMounted]);

  const loadCartData = async (token: string) => {
    const res = await axios.get("/api/cart/get", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setCartItems(res.data.cartData!);
  };

  // Update local storage whenever the token changes
  useEffect(() => {
    if (isMounted && token) {
      safeSetItem(localStorage, "token", token);
      loadCartData(token);
    } else if (isMounted && !token) {
      safeRemoveItem(localStorage, "token");
    }
  }, [token, isMounted]);

  // Updated addToCart using itemId directly
  const addToCart = async (id: string) => {
    const updatedCart = { ...cartItems };
    updatedCart[id] = (updatedCart[id] || 0) + 1;

    setCartItems(updatedCart);

    if (token) {
      try {
        await axios.post(
          "/api/cart/add",
          { cartItems: updatedCart },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    }
  };

  const removeFromCart = async (id: string) => {
    const updatedCart = { ...cartItems };
    if (updatedCart[id]) {
      updatedCart[id] -= 1;
      if (updatedCart[id] === 0) {
        delete updatedCart[id];
      }
    }

    setCartItems(updatedCart);

    if (token) {
      try {
        await axios.post(
          "/api/cart/remove",
          { cartItems: updatedCart },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    }
  };

  const getTotalCartAmount = () => {
    return Object.entries(cartItems).reduce(
      (totalAmount, [itemId, quantity]) => {
        if (quantity > 0) {
          const itemInfo = data?.find(
            (item: FoodItem) => String(item._id) === itemId
          );
          totalAmount += itemInfo ? itemInfo.price * quantity : 0;
        }
        return totalAmount;
      },
      0
    );
  };

  const contextValue: StoreContextValue = {
    foodList: data || [],
    cartItems,
    addToCart,
    removeFromCart,
    showLinks,
    setShowLinks,
    getTotalCartAmount,
    token,
    setToken: (newToken: string | null) => setToken(newToken),
    userData,
    setUserData: (data: FoodItem) => setUserData(data),
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading food list</div>;

  return (
    <storeContext.Provider value={contextValue}>
      {children}
    </storeContext.Provider>
  );
};

export default StoreContextProvider;
