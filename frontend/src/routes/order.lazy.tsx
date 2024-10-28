import { lazy, Suspense } from "react";
const PlaceOrder = lazy(() => import("@/pages/PlaceOrder/PlaceOrder"));
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/order")({
  component: () => <Suspense fallback="Loading...">{<PlaceOrder />}</Suspense>,
});
