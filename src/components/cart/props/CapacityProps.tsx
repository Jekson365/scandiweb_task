import { Attribute, Item } from "../../../types/types";

const CapacityProps = ({ attr }: { attr: Attribute }) => {
  return (
    <>
      <div className="cart-item-properties">
        <h4>{attr.name}</h4>
        <div className="props g-10">
          {attr.items.map((itemProps: Item) => {
            return (
              <>
                <div
                  className={`min-prop-item capacity-item ${
                    itemProps.isSelected ? "selected-capacity" : ""
                  }`}
                  style={{
                    backgroundColor: itemProps.value,
                  }}
                >
                  {itemProps.display_value}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CapacityProps;
