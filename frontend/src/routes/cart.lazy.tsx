import { lazy, Suspense } from "react";
const Cart = lazy(() => import("@/pages/Cart/Cart"));
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/cart")({
  component: () => (
    <Suspense fallback="Loading...">
      <Cart />
    </Suspense>
  ),
});
