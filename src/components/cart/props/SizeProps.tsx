import { Attribute, Item } from "../../../types/types";

const SizeProps = ({ attr }: { attr: Attribute }) => {
  return (
    <>
      <div className="cart-item-properties">
        <h4>{attr.name}</h4>
        <div className="props" data-testid={`cart-item-attribute-${attr.name}`}>
          {attr.items.map((itemProps: Item) => {
            return (
              <>
                <div
                  data-testid={`${itemProps.isSelected ? `cart-item-attribute-${itemProps.id_name}-selected` 
                    : `cart-item-attribute-${itemProps.id_name}`}`}
                  className={`min-prop-item ${
                    itemProps.isSelected ? "selected-size" : ""
                  }`}
                >
                  {itemProps.value}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SizeProps;
