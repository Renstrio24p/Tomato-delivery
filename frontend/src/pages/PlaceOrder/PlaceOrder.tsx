import { Form } from "@/components/Form/Form";
import { storeContext } from "@/context/StoreContext";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { formatted } from "./func/Format";
import { Props, UserType } from "./types/Props";
import { FoodItem } from "@/context/types/Context";
import axios from "@/server/api/axios";
import { useNavigate } from "@tanstack/react-router";

export default function PlaceOrder({}: Props) {
  const context = useContext(storeContext);

  const {
    subtotal,
    deliveryFee,
    total,
    token,
    foodList,
    cartItems,
    initialTotal,
  } = formatted(context!);

  const [data, setData] = useState<UserType>({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    phone: "",
    zipCode: "",
    country: "",
  });

  // const toCheckout = () => navigate({ to: "/checkout" });
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    return setData(data => ({ ...data, [name]: value }));
  };

  const placeOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let orderItems: FoodItem[] = [];
    foodList.map(item => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: initialTotal,
    };
    let res = await axios.post("/api/order/place", orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data.success) {
      const { session_url } = res.data;
      window.location.replace(session_url);
    } else {
      alert(res.data.error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate({ to: "/cart" });
    } else if(initialTotal === 0) {
      navigate({ to: "/cart" });
    }
  }, [token]);

  return (
    <Form
      onSubmit={placeOrder}
      className="flex flex-col md:flex-row items-start justify-between gap-[50px] mt-24">
      <div className="w-full max-w-[max(50%,500px)]">
        <p className="text-lg font-semibold mb-8">Delivery Information</p>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3">
          <input
            type="text"
            placeholder="First Name"
            aria-label="First Name"
            name="firstName"
            onChange={handleChange}
            value={data.firstName}
            required
            className="border p-2 rounded focus:outline focus:outline-amber-600"
          />
          <input
            type="text"
            placeholder="Last Name"
            aria-label="Last Name"
            name="lastName"
            onChange={handleChange}
            value={data.lastName}
            required
            className="border p-2 rounded focus:outline focus:outline-amber-600"
          />
          <input
            type="email"
            placeholder="Email Address"
            aria-label="Email Address"
            name="email"
            onChange={handleChange}
            value={data.email}
            required
            className="border col-span-1 md:col-span-2 p-2 rounded focus:outline focus:outline-amber-600"
          />
          <input
            type="text"
            placeholder="Street Address"
            aria-label="Street Address"
            name="street"
            onChange={handleChange}
            value={data.street}
            required
            className="border col-span-1 md:col-span-2 p-2 rounded focus:outline focus:outline-amber-600"
          />
          <input
            type="text"
            placeholder="City"
            aria-label="City"
            name="city"
            onChange={handleChange}
            value={data.city}
            required
            className="border p-2 rounded focus:outline focus:outline-amber-600"
          />
          <input
            type="text"
            placeholder="State / Province"
            aria-label="State"
            name="state"
            onChange={handleChange}
            value={data.state}
            required
            className="border p-2 rounded focus:outline focus:outline-amber-600"
          />
          <input
            type="text"
            placeholder="Zip Code"
            aria-label="Zip Code"
            name="zipCode"
            onChange={handleChange}
            value={data.zipCode}
            required
            className="border p-2 rounded focus:outline focus:outline-amber-600"
          />
          <input
            type="text"
            placeholder="Country"
            aria-label="Country"
            name="country"
            onChange={handleChange}
            value={data.country}
            required
            className="border p-2 rounded focus:outline focus:outline-amber-600"
          />
          <input
            type="text"
            placeholder="Phone"
            aria-label="Phone"
            name="phone"
            onChange={handleChange}
            value={data.phone}
            required
            className="border col-span-1 md:col-span-2 p-2 rounded focus:outline focus:outline-amber-600"
          />
        </div>
      </div>
      <div className="w-full max-w-[max(50%,500px)]">
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
          <button className="text-white bg-amber-600 w-[max(15vw,200px)] py-2 rounded-md text-sm md:mt-14">
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </Form>
  );
}
