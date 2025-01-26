import { useContext } from "react";
import { Attribute, CurrentProduct, Item } from "../../types/types";
import { CartContext } from "./Productpage";

const OtherDetail = ({ attr }: { attr: CurrentProduct }) => {
  const { cartObject, setCartObject } = useContext(CartContext);

  const handleSelect = (item: Item) => {
    const updatedAttributes = cartObject.attributes.map(
      (attribute: Attribute) => {
        if (
          attribute.id === attr.id &&
          attribute.id_name !== "Capacity" &&
          attribute.id_name !== "Size" &&
          attribute.id_name !== "Color"
        ) {
          console.log(attr.id_name);
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
      <div className="row">
        {attr.id_name}
        <div className="radios" style={{ display: "flex", gap: "10px" }}>
          {attr.items.map((item: Item) => {
            return (
              <>
                <div
                  data-testid={`product-attribute-${item.id_name}`}
                  onClick={() => handleSelect(item)}
                  className={`radio-box ${
                    item.isSelected ? "selected-radio-box" : null
                  }`}
                >
                  <div>{item.value}</div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default OtherDetail;
