import { useContext } from "react";
import { Attribute, CurrentProduct, Item } from "../../types/types";
import { CartContext } from "./Productpage";

const Capacity = ({ attr }: { attr: CurrentProduct }) => {
  const { cartObject, setCartObject } = useContext(CartContext);

  const handleSelect = (item: Item) => {
    const updatedAttributes = cartObject.attributes.map((attribute: Attribute) => {
        if (attribute.id === attr.id && attribute.id_name === 'Capacity') {
          console.log(attr.id_name)
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
      <div className="row sizes">
        <>
          <div className="title">capacity</div>
          <div className="sizes-container">
            {attr.items.map((item: Item) => {
              return (
                <>
                  <div
                  data-testid={`product-attribute-${item.id_name}`} 
                    className={`size ${
                      item.isSelected ? "selected-capacity" : ""
                    }`}
                    onClick={() => handleSelect(item)}
                  >
                    {item.value}
                  </div>
                </>
              );
            })}
          </div>
        </>
      </div>
    </>
  );
};

export default Capacity;
