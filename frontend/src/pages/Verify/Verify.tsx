import axios from "@/server/api/axios";
import { useSearch } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

type Props = {};

export default function Verify({}: Props) {
  const searchParams = useSearch({ from: "/verify" });
  const navigate = useNavigate();

  const success = searchParams.success;
  const orderId = searchParams.order_id;

  console.log(success, orderId);

  const verifyPayment = async () => {
    const res = await axios.post("/api/order/verify", {
      success,
      orderId,
    });

    if(res.data.success){
        navigate({ to: "/my-orders" });
    } else {
        navigate({ to: "/" });
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="min-h-[60vh] grid place-items-center">
      <div className="w-16 h-16 border-4 border-gray-400 border-t-amber-600 rounded-full animate-spin"></div>
    </div>
  );
}
