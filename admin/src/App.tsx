import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./gen/routeTree.gen.ts";
import { lazy, Suspense } from "react";
const Hydrate = lazy(() => import("./server/Hydrate.tsx"));
const NotFound404 = lazy(() => import("./pages/404/NotFound.tsx"));
export const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFound404,
});

type Props = {};

export default function App({}: Props) {
  return (
    <Suspense fallback="Loading...">
      <Hydrate>
        <RouterProvider router={router} />
      </Hydrate>
    </Suspense>
  );
}
