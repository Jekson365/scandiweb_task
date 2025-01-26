import { Attribute, CurrentProduct, Item } from "../../types/types";
import "../../styles/productpage.scss";
import { useQuery } from "@apollo/client";
import {
  GET_CURRENT_PRODUCT,
  GET_PROD_BY_CAT,
} from "../../graphql/queries/productQueires";
import { useSearchParams } from "react-router-dom";
import Size from "./Size";
import Color from "./Color";
import Capacity from "./Capacity";
import OtherDetail from "./OtherDetail";
import { createContext, useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import uuid from "react-uuid";
import ProductImages from "./ProductImages";

export const CartContext = createContext<any>({});

const Productpage = () => {
  const { addItem, items, updateItemQuantity } = useCart();
  const [validProps, setValidProps] = useState(false);
  const [searchParams] = useSearchParams();
  const [cartObject, setCartObject] = useState<any>({
    id: null,
    name: "",
    price: "",
    inStock: null,
    uniq_id: null,
    attributes: [],
    gallery: [],
  });
  const { loading, error, data } = useQuery(GET_PROD_BY_CAT, {
    variables: { id: searchParams.get("id"), cat: "" },
  });

  useEffect(() => {
    if (data?.productsByCat) {
      const { name, price, id, attributes, gallery, inStock } = data.productsByCat[0];

      const transformedAttributes = attributes.map((attribute: Attribute) => ({
        ...attribute,
        items: attribute.items.map((item: Item) => ({
          ...item,
          isSelected: false,
        })),
      }));

      setCartObject({
        uniq_id: id,
        name: name,
        price: price,
        inStock: inStock,
        attributes: transformedAttributes,
        gallery: gallery,
      });
    }
  }, [data]);

  useEffect(() => {
    const allFilled = cartObject.attributes.every((attribute: Attribute) => {
      const selectedItems = attribute.items.filter((item) => item.isSelected);
      return selectedItems.length > 0;
    });
    setValidProps(allFilled);
  }, [cartObject.attributes]);

  if (loading) {
    return <>loading...</>;
  }
  if (error) {
    return <>somethin went wrong!</>;
  }
  const handleCartItems = () => {
    if (validProps) {
      let itemExists = false;
      items.forEach((e: any) => {
        if (
          JSON.stringify(e.attributes) === JSON.stringify(cartObject.attributes)
        ) {
          updateItemQuantity(e.id, e.quantity + 1);
          itemExists = true;
        }
      });
      if (!itemExists) {
        addItem({ ...cartObject, id: uuid() });
      }
    }
  };

  return (
    <>
      <div
        className="product-page-container"
        style={{ transform: "translateY(0px)" }}
      >
        <ProductImages product={data.productsByCat[0]} />
        <CartContext.Provider value={{ cartObject, setCartObject }}>
          <div className="col col-2">
            <div className="col-2-inner-cover">
              <div
                className="product-content"
                style={{ gap: "10px !important" }}
              >
                {cartObject.attributes.map((attr: CurrentProduct) => {
                  return (
                    <>
                      {attr.id_name === "Size" ? (
                        <>
                          <Size attr={attr} />
                        </>
                      ) : attr.id_name === "Color" ? (
                        <>
                          <Color attr={attr} />
                        </>
                      ) : attr.id_name === "Capacity" ? (
                        <>
                          <Capacity attr={attr} />
                        </>
                      ) : attr.id_name !== "" ? (
                        <>
                          <OtherDetail attr={attr} />
                        </>
                      ) : null}
                    </>
                  );
                })}
                <div className="row price">
                  <div className="title">Price</div>
                  <div className="title">{cartObject.price.amount}$</div>
                </div>
                <div className="description">
                  <button
                    className={`custom-button ${
                      !validProps ? "add-cart-gray" : ""
                    }`}
                    data-testid="add-to-cart"
                    onClick={handleCartItems}
                  >
                    Add to cart
                  </button>
                  <div className="desc" data-testid="product-description">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Itaque minima veritatis provident suscipit, fugiat
                    voluptatem nesciunt recusandae ut aut iusto?
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CartContext.Provider>
      </div>
    </>
  );
};

export default Productpage;
