import { lazy, Suspense } from "react";
import { Props } from "./types/Props";

const Section = lazy(() => import("../Section/Section"));

export default function Header({}: Props) {
  return (
    <Suspense fallback="Loading...">
      <Section
        id="header"
        className={`bg-header h-[50vw] md:h-[34vw] w-full my-4 mx-auto bg-no-repeat relative bg-cover bg-top rounded-2xl overflow-hidden`}>
        <div className="absolute top-0 right-0 w-full h-full bg-slate-500/40 rounded-2xl"></div>
        <div className="absolute flex flex-col items-start gap-[1.5vw] w-full pr-10 md:pr-0 md:max-w-[50%] bottom-[10%] left-[6vw] text-white animate-[fadeIn_0.5s_ease-in]">
          <h1 className="font-semibold text-[max(4.5vw,22px)]">
            Order your favorite food here
          </h1>
          <p className="md:text-md lg:text-[1vw] text-sm max-w-full">
            Choose from a diverse menu featuring a delicious variety of dishes
            crafted with the finest ingredients and culinary expertise, one
            delicious meal at a time.
          </p>
          <button className="text-gray-800 font-semibold mt-2 py-[1vw] px-[2.3vw] bg-white text-[max(1vw,13px)] rounded-2xl">
            View Menu
          </button>
        </div>
      </Section>
    </Suspense>
  );
}
