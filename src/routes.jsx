import App from "./App";
import ErrorPage from "./ErrorPage";
import Home from "./Home";
import ShopPage from "./ShopPage";
import CartPage from "./CartPage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <ShopPage /> },
      { path: "cart", element: <CartPage /> },
    ],
  },
];

export default routes;
