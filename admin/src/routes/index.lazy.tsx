import { lazy, Suspense } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
const Add = lazy(() => import("@/pages/Add/Add"));

export const Route = createLazyFileRoute("/")({
  component: () => <Suspense fallback="Loading...">{<Add />}</Suspense>,
});
