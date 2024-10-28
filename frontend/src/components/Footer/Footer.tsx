import { assets } from "@/assets/assets";
import { Props } from "./types/Props";

export default function Footer({}: Props) {
  return (
    <footer
      id="footer"
      className="w-full text-gray-300 bg-[#323232] flex items-center justify-center flex-col gap-4 pt-[80px] pb-4 px-[5vw] mt-24">
      <div className="border-b-2 border-gray-500 pb-5 w-full grid md:grid-cols-2 lg:grid-cols-3 gap-[80px]">
        <div className="flex flex-col items-start gap-4 lg:col-span-1 md:col-span-2">
          <img src={assets.logo} alt="" />
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus
            fugit officia, ab tempora dolor quo id fugiat repudiandae
            perferendis. Consequatur quis suscipit sapiente dolores ducimus,
            excepturi autem laudantium et cupiditate.
          </p>
          <div className="flex gap-3">
            <img
              className="w-9"
              src={assets.facebook_icon}
              alt="facebook icon"
            />
            <img className="w-9" src={assets.twitter_icon} alt="twitter icon" />
            <img
              className="w-9"
              src={assets.linkedin_icon}
              alt="linkedin icon"
            />
          </div>
        </div>
        <div className="flex flex-col items-start gap-4">
          <h3 className="font-bold text-xl">COMPANY</h3>
          <ul className="flex flex-col gap-1">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">About us</li>
            <li className="cursor-pointer">Delivery</li>
            <li className="cursor-pointer">Privacy policy</li>
          </ul>
        </div>
        <div className="flex flex-col items-start gap-4">
          <h3 className="font-bold text-xl">GET IN TOUCH</h3>
          <ul className="flex flex-col gap-1">
            <li className="cursor-pointer">Phone: 123-456-7890</li>
            <li className="cursor-pointer">Email: 6ZSjZ@example.com</li>
          </ul>
        </div>
      </div>
      <p>Copyright © 2024 Tomato.com - All rights reserved.</p>
    </footer>
  );
}
