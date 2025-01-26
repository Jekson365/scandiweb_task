import { Attribute, Item } from "../../../types/types";

function ColorProps({ attr }: { attr: Attribute }) {
  return (
    <>
      <div className="cart-item-properties">
        <h4>{attr.name}</h4>
        <div className="props g-10">
          {attr.items.map((itemProps: Item) => {
            return (
              <>
                <div
                  className={`min-prop-item color-item ${
                    itemProps.isSelected ? "selected-color" : ""
                  }`}
                  style={{
                    backgroundColor: itemProps.value,
                  }}
                ></div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ColorProps;
