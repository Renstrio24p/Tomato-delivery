import { lazy, Suspense } from "react";
const Add = lazy(() => import("@/pages/Add/Add"));
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/add")({
  component: () => <Suspense fallback="Loading...">{<Add />}</Suspense>,
});
