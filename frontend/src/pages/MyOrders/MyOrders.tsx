import { assets } from "@/assets/assets";
import axios from "@/server/api/axios";
import { useQuery } from "@tanstack/react-query";
import { Orders } from "./types/Orders";

export default function MyOrders() {
  const token = localStorage.getItem("token");

  const { data, error, isLoading, refetch } = useQuery<{ data: Orders[] }>({
    queryKey: ["orders"],
    queryFn: async () => {
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.post(
        "/api/order/user-orders",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) {
    return (
      <div className="text-center text-red-500">
        Error: Token verification failed
      </div>
    );
  }

  const getMyOrders = data?.data.map((order, index) => (
    <div
      key={index}
      className="flex flex-col justify-between items-start bg-white p-4 border border-amber-600 rounded-lg shadow-md mb-4 w-full">
      <img
        src={assets.parcel_icon}
        alt="Order icon"
        className="w-16 h-16 object-contain mb-2"
      />
      <div className="flex justify-between flex-col flex-grow w-full">
        <div className="grid grid-cols-1 gap-2 w-full">
          {order.items.map((item, itemIndex) => (
            <div key={itemIndex} className="flex justify-between items-center">
              <p className="font-medium">
                {item.name} x {item.quantity}
              </p>
              <p className="ml-12 text-gray-600 text-right">
                ${item.price.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-start mt-6">
        <p className="text-sm text-gray-600">Items: {order.items.length}</p>
        <p className="flex items-center text-sm mt-2">
          <span className="text-amber-600">&#x25cf;</span>
          <b className="ml-1 font-semibold text-gray-700">{order.status}</b>
        </p>
        <p className="mt-2 font-semibold text-lg">
          Total: ${order.amount.toFixed(2)}
        </p>
        <button
          onClick={() => refetch()}
          className="mt-2 bg-orange-200 py-2 px-4 rounded hover:bg-amber-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-300">
          Track Order
        </button>
      </div>
    </div>
  ));

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {getMyOrders}
      </div>
    </div>
  );
}
