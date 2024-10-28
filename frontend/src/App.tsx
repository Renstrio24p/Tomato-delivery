import { lazy, Suspense } from "react";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./gen/routeTree.gen.ts";
const Hydrate = lazy(() => import("./server/Hydrate.tsx"));
const NotFound404 = lazy(() => import("./pages/404/NotFound.tsx"));
import "animate.css";
import "boxicons/css/boxicons.min.css";
import { Props } from "./types/Props";

export const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFound404,
});


const routerEl = <RouterProvider router={router} />;

export default function App({}: Props) {
  return (
    <Suspense fallback="Loading...">
      <Hydrate>{routerEl}</Hydrate>
    </Suspense>
  );
}
