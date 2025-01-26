import { createContext, ReactNode, useContext, useState } from "react";
import { useCart } from "react-use-cart";
import { CurrentProduct } from "../../types/types";

interface CartContextValue {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: CurrentProduct[];
  setCartItems: React.Dispatch<React.SetStateAction<CurrentProduct[]>>;
  cartQuantity: number;
}

const CartState = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { totalItems, items }: any = useCart();

  const [open, setOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CurrentProduct[]>(items);

  return (
    <CartState.Provider
      value={{
        open,
        setOpen,
        setCartItems,
        cartItems,
        cartQuantity: totalItems,
      }}
    >
      {children}
    </CartState.Provider>
  );
};

export const useCartContext = () => useContext(CartState);
