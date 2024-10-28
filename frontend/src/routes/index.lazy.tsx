import { lazy, Suspense } from "react";
const Home = lazy(() => import("@/pages/Home/Home"));
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: () => <HomeInstance />,
});

function HomeInstance() {
  return <Suspense fallback="Loading...">{<Home />}</Suspense>;
}
