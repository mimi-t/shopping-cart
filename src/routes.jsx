import App from "./App";
import ErrorPage from "./ErrorPage";
import Shop from "./Shop";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "shop",
    element: <Shop />,
  },
];

export default routes;
