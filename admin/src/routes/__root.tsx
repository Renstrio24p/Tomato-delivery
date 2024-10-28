import { lazy, Suspense, useEffect } from "react";
import { createRootRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { DevTools } from "@/server/DevTools.tsx";
import { Main } from "@/components/UI/Main/Main";
import { ToastContainer } from "react-toastify";
const Navbar = lazy(() => import("@/components/Navbar/Navbar"));
const Sidebar = lazy(() => import("@/components/Sidebar/Sidebar"));

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ to: "/" });
  }, []);

  const enableDevtools = import.meta.env.MODE === "development";

  return (
    <Suspense fallback="Loading...">
      <DevTools enable={enableDevtools}>
        <ToastContainer />
        <Navbar />
        <Main className="flex">
          <Sidebar />
          <Outlet />
        </Main>
      </DevTools>
    </Suspense>
  );
}
