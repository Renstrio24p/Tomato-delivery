import { assets } from "@/assets/assets";
import { Props } from "./types/Props";
import { Link } from "@tanstack/react-router";

export default function Navbar({}: Props) {

  

  return (
    <header className="flex justify-between items-center py-2 px-[4%] border-b border-gray-300">
      <Link to="/">
        <img
          src={assets.logo}
          alt="logo image"
          className=" w-[max(10%,80px)]"
        />
      </Link>
      <img src={assets.profile_image} alt="profile image" className=" w-10" />
    </header>
  );
}
