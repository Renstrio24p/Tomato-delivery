import { Product, Props } from "./types/List";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/server/api/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function List({}: Props) {
  const queryClient = useQueryClient();

  // Fetch the food list
  const { data, error, isLoading } = useQuery<{ data: Product[] }>({
    queryKey: ["list"],
    queryFn: async () => {
      const response = await axios.get("/api/food/list");
      return response.data;
    },
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchInterval: 30000,
  });

  // Mutation to remove an item
  const removeItemMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete("/api/food/remove", {
        data: { id },
      });
    },
    onSuccess: () => {
      toast.success("Item removed successfully");
      queryClient.invalidateQueries({ queryKey: ["list"] });
    },
    onError: () => {
      toast.error("Failed to remove item");
    },
  });

  if (error) {
    toast.error("Failed to load data");
    return <div>Error loading data</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const list = data?.data;
  const url = "http://localhost:8080";

  const displayList = list?.map((item, i) => (
    <div
      key={i}
      className="bg-white shadow-md rounded-xl flex flex-col text-left w-full">
      <img
        src={`${url}/images/${item.image}`}
        alt={item.name}
        className="w-full h-40 object-cover rounded-t-xl"
      />
      <div className="p-4 flex flex-col justify-between">
        <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
        <p className="text-sm text-gray-600">{item.category}</p>
        <p className="text-md text-gray-600 my-2">{item.description}</p>
        <p className="text-lg font-bold text-amber-600 mt-2">${item.price}</p>
        <button
          onClick={() => removeItemMutation.mutate(item._id)}
          className="mt-4 bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-800">
          Remove Item
        </button>
      </div>
    </div>
  ));

  const verifylist =
    displayList?.length === 0 ? <p>No items found</p> : displayList;

  return (
    <div className="my-16 mx-5 w-full">
      <h1 className="text-2xl font-semibold">All Food List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {verifylist}
      </div>
    </div>
  );
}
