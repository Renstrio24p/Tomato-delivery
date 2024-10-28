import { Link, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Aside } from "../UI/Aside/Aside";
import { Props } from "./types/Props";
import { SideLinks } from "@/constants/SideLinks";

export default function Sidebar({}: Props) {
  const location = useLocation(); // Get the current location
  const [activePath, setActivePath] = useState(location.pathname);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const generateSideLinks = SideLinks.map(({ icon, name, path }, i) => {
    const isActive = activePath === path;

    return (
      <li key={i} className="w-full">
        <Link
          to={path}
          className={`flex gap-3 items-center border py-2 px-3 rounded-t-md rounded-l-md ${
            isActive ? "bg-amber-600" : ""
          }`}
          onClick={() => setActivePath(path)}>
          <img src={`/assets/${icon}`} alt="icons" />
          <p className="hidden md:block">{name}</p>
        </Link>
      </li>
    );
  });

  return (
    <Aside className="w-[18%] min-h-screen border-r text-[max-(1vw,10px)]">
      <ul className="pt-8 pl-[20%] flex flex-col gap-5">{generateSideLinks}</ul>
    </Aside>
  );
}
