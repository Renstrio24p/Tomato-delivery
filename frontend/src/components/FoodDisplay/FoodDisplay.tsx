import { lazy, Suspense, useContext } from "react";
const FoodItem = lazy(() => import("../FoodItem/FoodItem"));
const Section = lazy(() => import("../Section/Section"));
import { storeContext } from "@/context/StoreContext";
import { Props } from "./types/Props";
import { StoreContextValue } from "@/context/types/Context";

export default function FoodDisplay({ category }: Props) {
  const context = useContext(storeContext);

  // Check if context is not null
  if (!context) {
    // Skeleton loading state
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 gap-x-[50px] mt-8">
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="animate-pulse flex flex-col items-center space-y-4">
            <div className="w-full h-40 bg-gray-300 rounded-lg"></div>
            <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
            <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  const { foodList } = context as StoreContextValue;

  const showFoodList =
    foodList.length > 0 ? (
      foodList.map((item, i) => {
        if (item.category === category || category === "All") {
          return (
            <div key={i} className="h-full">
              <FoodItem
                id={String(item._id)}
                name={item.name}
                description={item.description}
                price={item.price}
                image={`http://localhost:8080/images/${item.image}`}
              />
            </div>
          );
        }
        return <h1>No food items available for this category</h1>;
      })
    ) : (
      <p>No food items available.</p>
    );

  return (
    <Suspense fallback={<div className="flex justify-center">Loading...</div>}>
      <Section className="text-gray-700 mt-6" id="food-display">
        <h2 className="text-gray-700 font-semibold text-[max(2vw,24px)] ">
          Top dishes near you
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 gap-x-[50px] mt-8">
          {showFoodList}
        </div>
      </Section>
    </Suspense>
  );
}
