import { lazy, Suspense } from "react";
const MyOrders = lazy(() => import("@/pages/MyOrders/MyOrders"));
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/my-orders")({
  component: () => <Suspense fallback="Loading...">{<MyOrders />}</Suspense>,
});
