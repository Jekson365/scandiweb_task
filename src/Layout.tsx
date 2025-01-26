import { Header } from "./components/headers/Header";
import { Outlet } from "react-router-dom";
import { useCartContext } from "./components/providers/CartProvider";

const Layout = () => {
  const { open } = useCartContext()!;
  return (
    <>
      <div className={`overlay ${open ? "overlay-on" : ""}`}></div>
      <div className="absl">
        <Header />
      </div>
      <div className="cover" style={{ transform: "translateY(130px)" }}>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
