import App from "./App";
import ErrorPage from "./ErrorPage/ErrorPage";
import Home from "./Home/Home";
import ShopPage from "./ShopPage/ShopPage";
import CartPage from "./CartPage/CartPage";

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
