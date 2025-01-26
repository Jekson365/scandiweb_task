import { Attribute, Item } from "../../../types/types";

function OtherProps({ attr }: { attr: Attribute }) {
  return (
    <>
      <div className="col">
        {attr.id_name}
        <div className="radios" style={{ display: "flex", gap: "10px" }}>
          {attr.items.map((item: Item) => {
            return (
              <>
                <div
                  className={`radio-box cart-radio-item ${
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
}

export default OtherProps;
