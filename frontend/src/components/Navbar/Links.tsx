// NavLinks.tsx
import { LinksTags } from "@/constants/LinkTags";
import { storeContext } from "@/context/StoreContext";
import { Link } from "@tanstack/react-router";
import { Dispatch, FC, SetStateAction, useContext, useState } from "react";

interface NavLinksProps {
  handleLinkClick: (
    event: React.MouseEvent,
    path: string,
    name: string
  ) => void;
  displayQuantity: JSX.Element | boolean;
  setShowLogin: Dispatch<SetStateAction<boolean>>;
}

const NavLinks: FC<NavLinksProps> = ({
  handleLinkClick,
  displayQuantity,
  setShowLogin,
}) => {
  const [activeLink, setActiveLink] = useState("Home");
  const context = useContext(storeContext);

  const { showLinks, setShowLinks } = context!;

  const handleClick = (event: React.MouseEvent, path: string, name: string) => {
    handleLinkClick(event, path, name);
    setActiveLink(name); // Update active link state
    setShowLinks(false); // Hide links on click
  };

  const handleShow = () => {
    setShowLogin(true);
    setShowLinks(false);
  };

  const generateLinks = LinksTags.map(link => (
    <li key={link.path}>
      <Link
        to={link.path}
        onClick={e => handleClick(e, link.path, link.name)}
        className={
          activeLink === link.name
            ? "text-gray-700 border-b border-gray-700 transition duration-300"
            : "text-gray-400"
        }>
        {link.name}
      </Link>
    </li>
  ));

  const styles = `flex flex-col md:flex-row text-gray-700 gap-2 md:gap-4 text-[17px] fixed top-16 left-0 bg-white w-[max(10vw,250px)] h-screen p-6 transform transition-transform duration-300 ${
    showLinks ? "translate-x-0" : "-translate-x-full"
  }`;

  return (
    <ul className={styles}>
      {generateLinks}
      <div className="flex gap-6 items-start flex-col mt-3">
        <img src="/assets/search_icon.png" alt="search" className="w-[22px]" />
        <div className="relative">
          <Link to="/cart" onClick={e => handleLinkClick(e, "/", "Cart")}>
            <img src="/assets/basket_icon.png" alt="cart" className="w-6 h-6" />
            {displayQuantity}
          </Link>
        </div>

        <button
          onClick={handleShow}
          className="bg-transparent text-md text-gray-600 border border-red-700 py-2 px-5 md:py-2 md:px-8 rounded-3xl hover:bg-[#fff4f2] transition duration-300 w-full">
          Sign In
        </button>
      </div>
    </ul>
  );
};

export default NavLinks;
