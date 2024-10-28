import { lazy, Suspense } from "react";
import { createRootRoute } from "@tanstack/react-router";
import { DevTools } from "@/server/DevTools.tsx";

const Layout = lazy(() => import("@/Layout/Layout"));
const StoreContextProvider = lazy(() => import("@/context/StoreContext"));

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  const enableDevtools = import.meta.env.MODE === "development";
  return (
    <Suspense fallback="Loading...">
      <StoreContextProvider>
        <DevTools enable={enableDevtools}>
          <Layout />
        </DevTools>
      </StoreContextProvider>
    </Suspense>
  );
}
