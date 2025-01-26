import { RouterProvider } from "react-router-dom";
import AppRouter from "./AppRouter";
import "./styles/index.scss";
import { CartProvider as Cr } from "./components/providers/CartProvider";
import { CartProvider } from "react-use-cart";

function App() {
  return (
    <>
      <CartProvider>
        <Cr>
          <RouterProvider router={AppRouter} />
        </Cr>
      </CartProvider>
    </>
  );
}

export default App;
