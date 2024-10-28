import { StoreContextValue } from "@/context/types/Context";

export const formatted = (context: StoreContextValue) => {
    const { cartItems = {}, foodList, removeFromCart, getTotalCartAmount } = context;

    // Filter items that are in the cart with quantity > 0 and include quantity information
    const itemsInCart = foodList
        .filter(item => Number(cartItems[Number(item._id)]) > 0)
        .map(item => ({
            ...item,
            quantity: cartItems[Number(item._id)]
        }));


    // Calculate initial values for subtotal, delivery fee, and total
    const initialSubtotal = getTotalCartAmount();
    const initialDeliveryFee = initialSubtotal * 0.35;
    const initialTotal = initialSubtotal + initialDeliveryFee;

    // Format numbers to 2 decimal places
    const formatNumber = (num: number) => num.toLocaleString("en-US", {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });

    const subtotal = formatNumber(initialSubtotal);
    const deliveryFee = formatNumber(initialDeliveryFee);
    const total = formatNumber(initialTotal);

    return {
        subtotal,
        deliveryFee,
        total,
        itemsInCart,
        removeFromCart,
        cartItems,
    };
};
