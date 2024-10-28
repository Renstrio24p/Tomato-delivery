import { storeContext } from "@/context/StoreContext";
import { useNavigate } from "@tanstack/react-router";
import { useContext } from "react";
import { formatted } from "./func/Formatted";
import { Props } from "./types/Props";

export default function Cart({}: Props) {
  const context = useContext(storeContext);
  const navigate = useNavigate();

  const { total, deliveryFee, subtotal, removeFromCart, cartItems } = formatted(
    context!
  );

  // Get items currently in the cart by filtering food_list based on cartItems and quantities
  const itemsInCart =
    context?.foodList
      ?.filter(item => Number(cartItems[item._id]) > 0)
      .map(item => ({
        ...item,
        quantity: cartItems[item._id],
      })) || [];

  const filterCart =
    itemsInCart.length > 0 ? (
      itemsInCart.map((item, i) => (
        <div
          key={i}
          className="grid grid-cols-6 items-center text-gray-700 border-b border-gray-200 gap-4">
          <img
            src={`http://localhost:8080/images/${item.image}`}
            alt={item.name}
            className="my-2 w-[70px] rounded"
          />
          <p className="text-sm md:text-md">{item.name}</p>
          <p>$ {item.price}</p>
          <p> {item.quantity} </p>
          <p>$ {(Number(item.quantity) * item.price).toFixed(2)}</p>
          <p
            onClick={() => removeFromCart(String(item._id))}
            className="cursor-pointer border rounded w-[40px] h-[40px] flex justify-center items-center">
            <span>x</span>
          </p>
        </div>
      ))
    ) : (
      <p className="text-center text-gray-700 my-4">No items in cart.</p>
    );

  const styles = `text-white ${itemsInCart.length === 0 ? "bg-gray-500/30" : "bg-amber-700"} w-[max(15vw,200px)] py-2 rounded-md text-sm`;

  const itemsInCartLength = itemsInCart.length === 0;

  return (
    <div className="mt-16">
      <div className="border-b border-gray-200">
        <div className="grid grid-cols-6 items-center text-gray-700 text-[max(1vw,14px)]">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {filterCart}
      </div>
      <div className="mt-16 flex flex-col md:flex-row justify-between gap-[max(12vw,20px)]">
        <div className="flex-1 flex flex-col gap-6">
          <h4>Cart Total</h4>
          <div>
            <div className=" flex justify-between text-gray-500">
              <p>Sub Total</p>
              <p>${subtotal}</p>
            </div>
            <div className="border-y border-gray-200 flex justify-between text-gray-500 py-2 my-2">
              <p>Delivery Free</p>
              <p>${deliveryFee}</p>
            </div>
            <div className=" flex justify-between text-gray-500">
              <b>Total</b>
              <b>${total}</b>
            </div>
          </div>
          <button
            disabled={itemsInCartLength}
            className={styles}
            onClick={() => navigate({ to: "/checkout" })}>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="flex-1">
          <div>
            <p className="text-gray-500">If you have promo code, apply here</p>
            <div className="mt-2 flex justify-between items-center bg-slate-100 rounded">
              <input
                type="text"
                className="border-none bg-transparent outline-none pl-2"
                placeholder="Promo Code"
              />
              <button className="w-[10vw,250px] py-2 px-14 bg-gray-800 text-white rounded-md">
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
