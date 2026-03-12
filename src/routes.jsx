import App from "./App";
import ErrorPage from "./ErrorPage";
import Home from "./Home";
import Shop from "./Shop";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
    ],
  },
];

export default routes;
