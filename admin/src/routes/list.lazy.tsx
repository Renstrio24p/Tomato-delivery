import { lazy, Suspense } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
const List = lazy(() => import("@/pages/List/List"));

export const Route = createLazyFileRoute("/list")({
  component: () => <Suspense fallback="Loading...">{<List />}</Suspense>,
});
