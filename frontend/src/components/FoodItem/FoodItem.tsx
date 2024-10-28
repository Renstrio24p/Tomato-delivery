import { storeContext } from "@/context/StoreContext";
import { useContext } from "react";
import { Props } from "./types/Props";
import { StoreContextValue } from "@/context/types/Context";
import { assets } from "@/assets/assets";

export default function FoodItem({
  id,
  name,
  description,
  price,
  image,
}: Props) {
  const context = useContext(storeContext);

  // If context is not available, render the skeleton loader
  if (!context) {
    return (
      <div className="w-full m-auto rounded-md shadow overflow-hidden animate-pulse transition duration-300 ease-in-out h-full">
        <div className="container relative">
          <div className="w-full h-40 bg-gray-300 rounded"></div>
        </div>
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
    );
  }

  const { cartItems, addToCart, removeFromCart } = context as StoreContextValue;

  const showCartItems = !cartItems[id] ? (
    <img
      src={assets.add_icon_white}
      alt="add icon"
      onClick={() => addToCart(id)}
      className="w-10 absolute bottom-2 right-2 cursor-pointer"
    />
  ) : (
    <div className="absolute bottom-2 right-2 flex gap-2 items-center p-1 rounded-3xl bg-white">
      <img
        onClick={() => removeFromCart(id)}
        src={assets.remove_icon_red}
        alt="remove icon"
        className="cursor-pointer w-8"
      />
      <p>{cartItems[id]}</p>
      <img
        onClick={() => addToCart(id)}
        src={assets.add_icon_green}
        alt="add icon"
        className="cursor-pointer w-8"
      />
    </div>
  );

  return (
    <div className="w-full m-auto rounded-md shadow overflow-hidden transition duration-300 ease-in-out hover:shadow-lg animate-[fadeIn_0.5s_ease-in] h-full grid">
      <div className="container relative h-[200px]">
        <img src={image} alt="food image" className="w-full h-full" />
        {showCartItems}
      </div>
      <div className="p-4 col-span-1">
        <div className="flex justify-between items-center mb-2">
          <p className="text-md font-semibold">{name}</p>
          <img
            src={assets.rating_starts}
            alt="rating stars"
            className="w-[70px]"
          />
        </div>
        <p className="text-gray-500 text-sm">{description}</p>
        <p className="text-orange-700 font-semibold my-2">$ {price}</p>
      </div>
    </div>
  );
}
