import { menu_list } from "@/assets/main";
import { lazy, MouseEvent, Suspense, useRef, useState } from "react";
const Section = lazy(() => import("../Section/Section"));
import { Props } from "./types/Props";

export default function ExploreMenu({ category, setCategory }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Function to handle mouse down event
  const handleMouseDown = (event: MouseEvent) => {
    setIsDragging(true);
    setStartX(event.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  // Function to handle mouse move event
  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    event.preventDefault();
    const x = event.pageX - (scrollRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2; // Scroll-fast
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // Function to handle mouse up event
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Function to handle mouse leave event
  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const showCategory = menu_list.map((item, i) => (
    <div
      onClick={() =>
        setCategory((prev: string) =>
          prev === item.menu_name ? "All" : item.menu_name
        )
      }
      key={i}
      className="cursor-pointer">
      <img
        src={item.menu_image}
        alt={item.menu_name}
        className={`w-[7.5vw] min-w-[80px] rounded ${
          category === item.menu_name
            ? "shadow-md border-4 border-orange-700 rounded-full transition duration-200"
            : ""
        }`}
      />
      <p className="text-gray-700 mt-2 text-[max(1.4vw,16px)]">
        {item.menu_name}
      </p>
    </div>
  ));

  // Skeleton loader for menu items
  const skeletonLoader = Array(5)
    .fill(0)
    .map((_, index) => (
      <div key={index} className="animate-pulse">
        <div className="w-[7.5vw] min-w-[80px] h-[80px] bg-gray-300 rounded-full"></div>
        <div className="h-4 bg-gray-300 mt-2 rounded w-3/4 mx-auto"></div>
      </div>
    ));

  return (
    <Suspense fallback="Loading...">
      <Section
        id="explore-menu"
        className="flex flex-col gap-5 border-b-2 border-gray-200 my-3 pb-2">
        <h2 className="text-gray-700 font-semibold text-2xl">
          Explore our menu
        </h2>
        <p className="w-full md:max-w-[60%] text-gray-700">
          Choose from a diverse menu featuring a delicious variety of dishes
          crafted with the finest ingredients and culinary expertise, one
          delicious meal at a time.
        </p>
        <div
          ref={scrollRef}
          className="flex justify-between gap-6 text-center my-5 overflow-x-scroll overflow-y-hidden list hide-scrollbar cursor-pointer"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}>
          {menu_list.length > 0 ? showCategory : skeletonLoader}
        </div>
      </Section>
    </Suspense>
  );
}
