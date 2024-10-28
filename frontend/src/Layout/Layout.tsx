import { lazy, Suspense, useContext, useState } from "react";
import { Outlet } from "@tanstack/react-router";
import { storeContext } from "@/context/StoreContext";
const Navbar = lazy(() => import("@/components/Navbar/Navbar"));
const Main = lazy(() => import("@/components/Main/Main"));
const LoginPopup = lazy(() => import("@/components/LoginPopup/LoginPopup"));
const Footer = lazy(() => import("@/components/Footer/Footer"));
const Container = lazy(() => import("@/components/Container/Container"));

export default function Layout() {
  const [showLogin, setShowLogin] = useState(false);

  // Get the context values
  const context = useContext(storeContext);
  if (!context) {
    throw new Error("Root must be used within a StoreContextProvider");
  }

  const { setShowLinks } = context;

  // Function to hide the links
  const hideLinks = () => {
    setShowLinks(false);
  };

  const show = showLogin && <LoginPopup setShowLogin={setShowLogin} />;

  return (
    <Suspense fallback="Loading...">
      {show}
      <div className="w-full max-w-[90%] mx-auto pt-24">
        <Container>
          <Navbar
            setShowLogin={setShowLogin}
            setShowLinks={setShowLinks}
            showLinks={context.showLinks}
          />
          <Main className="w-full" onClick={hideLinks}>
            <Outlet />
          </Main>
        </Container>
      </div>
      <Footer />
    </Suspense>
  );
}
