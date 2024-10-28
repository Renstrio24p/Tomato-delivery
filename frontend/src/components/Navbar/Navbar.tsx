import { Props } from "./types/Props";
import { Link, useNavigate } from "@tanstack/react-router";
import { lazy, Suspense, useContext } from "react";
import { StoreContextValue, UserType } from "@/context/types/Context";
import { storeContext } from "@/context/StoreContext";
import { LinksTags } from "@/constants/LinkTags";
import { assets } from "@/assets/assets";
const NavLinks = lazy(() => import("./Links"));

export default function Navbar({ setShowLogin }: Props) {
  const context = useContext<StoreContextValue | null>(storeContext);
  const {
    cartItems,
    setShowLinks,
    showLinks,
    token,
    setToken,
    userData,
    setUserData,
  } = context!;

  // Calculate total quantity in the cart
  const totalQuantityInCart = Object.values(cartItems).reduce(
    (acc, quantity) => Number(acc) + Number(quantity),
    0
  );

  const data = userData as UserType;

  const image = data.profile;

  const navigate = useNavigate();

  // Smooth scrolling for links with `#`
  const handleLinkClick = (
    event: React.MouseEvent,
    path: string,
    _name: string
  ) => {
    if (path.startsWith("#")) {
      event.preventDefault();
      const targetElement = document.querySelector(path);
      targetElement?.scrollIntoView({ behavior: "smooth" });
      navigate({ to: "/" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Close the links menu when a link is clicked
    setShowLinks(false);
  };

  const showLinkIf = showLinks ? (
    <i className="bx bx-x"></i>
  ) : (
    <i className="bx bx-menu"></i>
  );

  const generateLinks = LinksTags.map(link => (
    <li key={link.path}>
      <Link
        to={link.path}
        onClick={e => handleLinkClick(e, link.path, link.name)}
        className={`${
          showLinks
            ? "text-gray-700 border-b border-gray-700 transition duration-300"
            : "text-gray-400"
        }`}>
        {link.name}
      </Link>
    </li>
  ));

  const displayQuantity = Number(totalQuantityInCart) > 0 && (
    <>
      <div className="absolute w-5 h-5 bg-orange-500 rounded-full -top-2 -right-2 animate-ping"></div>
      <div className="absolute w-5 h-5 bg-orange-500 -top-2 -right-2 flex items-center justify-center text-white text-xs font-semibold rounded-full">
        {totalQuantityInCart}
      </div>
    </>
  );

  const label = showLinks ? "Close menu" : "Open menu";

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUserData({} as UserType);
    navigate({ to: "/" });
  };

  const profileImage = image
    ? `http://localhost:8080/images/users/${image}`
    : assets.profile_icon;

  const verifyLogin = !token ? (
    <button
      onClick={() => setShowLogin(true)}
      className="bg-transparent text-md text-gray-600 border border-red-700 py-2 px-5 md:py-2 md:px-8 rounded-3xl hover:bg-[#fff4f2] transition duration-300">
      Sign In
    </button>
  ) : (
    <div className="relative group">
      <img
        src={profileImage}
        className="w-10 h-10 rounded-full cursor-pointer object-contain"
        alt="profile"
      />
      <ul className="absolute hidden z-10 right-0 group-hover:flex flex-col gap-2 bg-white border border-amber-600 outline outline-white px-4 w-48 sm:w-36 lg:w-48">
        <li
          className="flex items-center py-2 gap-2 cursor-pointer"
          onClick={() => navigate({ to: "/my-orders" })}>
          <img src={assets.bag_icon} alt="bag icon" className="w-5" />
          <p className="hover:text-amber-600">Orders</p>
        </li>
        <hr className="border-t border-amber-600" />
        <li
          onClick={logout}
          className="flex items-center py-2 gap-2 cursor-pointer">
          <img src={assets.logout_icon} alt="logout icon" className="w-5" />
          <p className="hover:text-amber-600">Logout</p>
        </li>
      </ul>
    </div>
  );

  return (
    <Suspense fallback="Loading...">
      <header className="flex justify-between items-center py-5 fixed top-0 left-0 right-0 z-10 bg-white px-9">
        <div className="flex items-center gap-5">
          <Link to="/" onClick={e => handleLinkClick(e, "/", "Home")}>
            <img
              src="/assets/logo.png"
              className="w-[140px] md:w-32 h-auto"
              alt="logo"
            />
          </Link>
          <nav className="md:hidden">
            <button
              onClick={() => {
                setShowLinks(!showLinks);
              }}
              className="md:hidden text-gray-700 text-2xl"
              aria-label={label}>
              {showLinkIf}
            </button>
            <NavLinks
              handleLinkClick={handleLinkClick}
              displayQuantity={displayQuantity}
              setShowLogin={setShowLogin}
            />
          </nav>
        </div>

        <nav className="hidden md:flex items-center justify-between gap-5">
          <ul className="flex space-x-4">{generateLinks}</ul>
          <div className="flex gap-2 md:gap-5 items-center">
            <img
              src="/assets/search_icon.png"
              alt="search"
              className="w-[22px]"
            />
            <div className="relative">
              <Link to="/cart" onClick={e => handleLinkClick(e, "/", "Cart")}>
                <img
                  src="/assets/basket_icon.png"
                  alt="cart"
                  className="w-6 h-6"
                />
                {displayQuantity}
              </Link>
            </div>

            {verifyLogin}
          </div>
        </nav>
      </header>
    </Suspense>
  );
}
