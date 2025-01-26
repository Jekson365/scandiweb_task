import { useContext } from "react";
import { Attribute, CurrentProduct, Item } from "../../types/types";
import { CartContext } from "./Productpage";

const Color = ({ attr }: { attr: CurrentProduct }) => {
  const { cartObject, setCartObject } = useContext(CartContext);
  const handleSelect = (item: Item) => {
    const updatedAttributes = cartObject.attributes.map(
      (attribute: Attribute) => {
        if (attribute.id === attr.id && attribute.id_name === "Color") {
          const updatedItems = attribute.items.map((i: Item) => {
            return { ...i, isSelected: i.id_name === item.id_name };
          });
          return { ...attribute, items: updatedItems };
        }
        return attribute;
      }
    );

    setCartObject({ ...cartObject, attributes: updatedAttributes });
  };
  return (
    <>
      <div className="row colors">
        <div className="title">Color:</div>
        <div className="colors-container">
          {attr.items.map((item: Item) => {
            return (
              <div
              data-testid={`product-attribute-${item.id_name}`} 
                className={`color c-1 ${
                  item.isSelected ? "selected-color" : ""
                }`}
                onClick={() => handleSelect(item)}
                style={{ backgroundColor: item.value }}
              ></div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Color;
