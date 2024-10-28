import { lazy, Suspense } from "react";
const Verify = lazy(() => import("@/pages/Verify/Verify"));
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/verify")({
  component: () => <Suspense fallback="Loading...">{<Verify />}</Suspense>,
});
