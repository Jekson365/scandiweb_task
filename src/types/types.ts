export type Product = {
  map(arg0: (attribute: Attribute) => { items: { isSelected: boolean; value: string; display_value: string; id_name: string; }[]; id: Number; name: string; id_name: string; type: string; __typename: string; }): unknown;
  attributes: Product;
  name: string;
  price: Price;
  img: string;
  inStock:boolean;
  gallery: string[];
  id: number;
};

export type Price = {
  id: Number;
  amount: number;
  currency: Currency;
};

export type Currency = {
  label: string;
  symbol: string;
};


export type CartProduct = {
  id: string;
  name: string;
  quantity: Number;
  price: Price,
  itemTotal: any;
  items: any[];
  gallery: string[];
  attributes: Attribute[]
}

export type CurrentProduct = {
  quantity: number;
  id: Number | string;
  name: string;
  id_name: string;
  category: Category;
  gallery: string[];
  price: Price;
  items: Item[] | any;
  attributes: Attribute[];
};
export type Attribute = {
  id: Number;
  name: string;
  id_name: string;
  type: string;
  items: Item[];
  __typename: string
};
export type CartItem = {
  id: string;
  name: string;
  price: Price;
  quantity: number;
  attributes: Attribute[];
  gallery: string[];
};
export type Item = {
  value: string;
  inStock: boolean;
  display_value: string;
  id_name: string;
  isSelected: boolean;
};
export type Category = {
  name: string;
};
