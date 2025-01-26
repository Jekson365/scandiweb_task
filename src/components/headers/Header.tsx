import "../../styles/components.scss";
import centerIcon from "../../../assets/a-logo.png";
import cartIcon from "../../../assets/Empty Cart.png";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cart from "../cart/Cart";
import { useCartContext } from "../providers/CartProvider";

export const Header = () => {
  const [searchParams] = useSearchParams();
  const { cartQuantity } = useCartContext()!;
  const { open, setOpen } = useCartContext()!;
  const [location, setLocation] = useState<string | null>("");
  useEffect(() => {
    setLocation(searchParams.get("query"));
  }, []);
  return (
    <>
      <div className="header">
        <div className="nav-items">
          <div className="col col-1">
            <div className="items">
              <a
                href="/?query=clothes"
                data-testid={location === "clothes" ? 'active-category-link' : 'category-link'}
                className={location === "clothes" ? "selected-page" : ""}
              >
                Clothes
              </a>
              <a
                href="/?query=tech"
                data-testid={location === "tech" ? 'active-category-link' : 'category-link'}
                className={location === "tech" ? "selected-page" : ""}
              >
                Tech
              </a>
              <a
                href="/?query=all"
                data-testid={location === "all" ? 'active-category-link' : 'category-link'}
                className={location === "all" ? "selected-page" : ""}
              >
                All
              </a>
            </div>
          </div>
          <div className="col col-2">
            <img src={centerIcon} />
          </div>
          <div className="col col-3 p-r">
            <Cart open={open} />
            <img
              src={cartIcon}
              data-testid="cart-btn"
              onClick={() => setOpen(!open)}
            />
            <div className="counter">{cartQuantity}</div>
          </div>
        </div>
      </div>
    </>
  );
};
