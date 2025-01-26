import { useCart } from "react-use-cart";
import "../../styles/cart.scss";
import { Attribute, CartItem } from "../../types/types";
import { useEffect, useState } from "react";
import SizeProps from "./props/SizeProps";
import ColorProps from "./props/ColorProps";
import CapacityProps from "./props/CapacityProps";
import OtherProps from "./props/OtherProps";
import { useCartContext } from "../providers/CartProvider";
import { gql, useMutation } from "@apollo/client";
// import { ADD_CART_ITEM } from "../../graphql/mutations/productMutations";

const ADD_CART_ITEM = gql`
  mutation CartItem($items: [CartItemInput!]!) {
    createCartItem(items: $items) {
      product_id
      attributes
      amount
    }
  }
`;

function Cart({ open }: { open: boolean }) {
  const [addCartItem, { data, loading, error }] = useMutation(ADD_CART_ITEM);
  const { updateItemQuantity, items, emptyCart } = useCart();
  const [total, setTotal] = useState(0);
  const { cartQuantity } = useCartContext()!;
  const handleCartCunter = (item: CartItem, counteType: string) => {
    if (counteType == "inc") {
      updateItemQuantity(item.id, item.quantity + 1);
    } else {
      updateItemQuantity(item.id, item.quantity - 1);
    }
  };
  useEffect(() => {
    return setTotal(
      items.reduce(
        (total: number, item: any) => total + item.price.amount * item.quantity,
        0
      )
    );
  }, [items]);

  const handleOrder = () => {
    console.log(items);
    let modified = items.map((item) => {
      return {
        product_id: item.uniq_id,
        attributes: JSON.stringify(item.attributes),
        amount: item.quantity,
      };
    });
    try {
      addCartItem({
        variables: {
          items: modified,
        },
      });
      emptyCart();
    } catch (err) {
      throw err;
    }
  };
  useEffect(() => {
    console.log(items);
  }, [items]);
  return (
    <>
      <div className={`cart ${open ? null : "d-none"}`}>
        <h3>
          My Bag <span data-testid="cart-total">{cartQuantity}</span>{" "}
          {cartQuantity > 1 ? "items" : "item"}
        </h3>
        <div className="cart-items-list col mt-medium">
          {items &&
            items.map((item: any) => {
              return (
                <>
                  <div className="row p-medium">
                    <div className="col" style={{ width: "40%", gap: "10px" }}>
                      <h4>{item.name}</h4>
                      <h4>
                        {item.price.amount}
                        {item.price.currency.symbol}
                      </h4>
                      <div className="col g-10">
                        {item.attributes.map((attr: Attribute) => {
                          return (
                            <>
                              {attr.id_name === "Size" ? (
                                <>
                                  <SizeProps attr={attr} />
                                </>
                              ) : attr.id_name === "Color" ? (
                                <>
                                  <ColorProps attr={attr} />
                                </>
                              ) : attr.id_name === "Capacity" ? (
                                <>
                                  <CapacityProps attr={attr} />
                                </>
                              ) : (
                                <>
                                  <OtherProps attr={attr} />
                                </>
                              )}
                            </>
                          );
                        })}
                      </div>
                    </div>
                    <div className="col align-center" style={{ width: "10%" }}>
                      <button
                        className="counter-button"
                        data-testid="cart-item-amount-increase"
                        onClick={() => handleCartCunter(item, "inc")}
                      >
                        +
                      </button>
                      <div data-testid="cart-item-amount">{item.quantity}</div>
                      <button
                        data-testid="cart-item-amount-decrease"
                        className="counter-button"
                        onClick={() => handleCartCunter(item, "dec")}
                      >
                        -
                      </button>
                    </div>
                    <div
                      className="col"
                      style={{ width: "40%", padding: "10px" }}
                    >
                      <div className="cart-image-cover">
                        <img
                          style={{ width: "150px" }}
                          src={item && item?.gallery[0]}
                        />
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
        <div className="total mt-medium">
          <h3>Total</h3>
          <h3>{total}$</h3>
        </div>
        <div className="mt-medium" style={{ width: "100%" }}>
          <div className="order-button" onClick={handleOrder}>
            PLACE ORDER
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
