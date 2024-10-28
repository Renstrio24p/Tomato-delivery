import { lazy, Suspense } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
const Orders = lazy(() => import("../pages/Orders/Orders"));

export const Route = createLazyFileRoute("/orders")({
  component: () => <Suspense fallback="Loading...">{<Orders />}</Suspense>,
});
