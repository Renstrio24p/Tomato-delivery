import { lazy, Suspense, useState } from "react";
import { Props } from "./types/Props";
const Header = lazy(() => import("@/components/Header/Header"));
const AppDownload = lazy(() => import("@/components/AppDownload/AppDownload"));
const FoodDisplay = lazy(() => import("@/components/FoodDisplay/FoodDisplay"));
const ExploreMenu = lazy(() => import("@/components/ExploreMenu/ExploreMenu"));
export default function Home({}: Props) {
  const [category, setCategory] = useState("All");

  return (
    <Suspense fallback="Loading...">
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </Suspense>
  );
}
