import { useQuery } from "@tanstack/react-query";
import { Props } from "./types/Props";
import axios from "@/server/api/axios";
import { toast } from "react-toastify";
import { assets } from "@/assets/assets.ts";
import { options } from "./func/options";
import { ChangeEvent } from "react";

export default function Orders({}: Props) {
  const data = useQuery({
    queryKey: ["orders"],
    queryFn: () => {
      return axios.get("/api/order/list");
    },
    refetchOnWindowFocus: false,
  });

  if (data.isLoading) return <div className="text-center py-8">Loading...</div>;

  if (data.isError) return toast.error(data.error.message);

  const ordersData = data.data?.data.data;

  const statusHandler = async (
    e: ChangeEvent<HTMLSelectElement>,
    orderId: string
  ) => {
    try {
      const res = await axios.put("/api/order/status", {
        orderId,
        status: e.target.value,
      });

      if (res.data?.success) {
        toast.success("Status updated successfully!");
        await data.refetch();
      } else {
        toast.error(res.data?.message || "Failed to update status.");
      }
    } catch (error: any) {
      toast.error("An error occurred while updating status.");
    }
  };

  const datas =
    ordersData && ordersData.length > 0 ? (
      ordersData.map((order: any, index: number) => (
        <div
          key={index}
          className="grid grid-cols-1 md:flex-row items-start md:items-center p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <img
            src={assets.parcel_icon}
            alt="parcel icon"
            className="w-12 h-12 mb-4 md:mb-0 mr-4"
          />
          <div className="grid grid-cols-2 md:flex-row justify-between gap-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-800">
                {order.items.map((item: any, i: number) => (
                  <span key={i} className="text-gray-700">
                    {item.name} x{item.quantity}
                    {i < order.items.length - 1 && ", "}
                  </span>
                ))}
              </p>
              <p className="text-xs text-gray-500">
                Items: {order.items.length}
              </p>
              <p>Order Amount: ${order.amount}</p>
              <select
                onChange={e => statusHandler(e, order._id)}
                value={order.status}
                className="w-fit p-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition">
                {options.map((option, i) => (
                  <option key={i} value={option.value}>
                    {option.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-sm text-gray-600 space-y-1 flex-1">
              <p className="font-medium text-gray-700">$ {order.amount}</p>
              <p>
                {order.address.firstName} {order.address.lastName}
              </p>
              <p className="font-medium">• {order.status}</p>
              <p>
                {order.address.street}, {order.address.state},{" "}
                {order.address.zipCode}, {order.address.country}
              </p>
              <p>Phone: {order.address.phone}</p>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p className="text-center text-gray-500">No orders found.</p>
    );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Orders</h1>
      <div className="grid grid-cols-1 gap-6">{datas}</div>
    </div>
  );
}
