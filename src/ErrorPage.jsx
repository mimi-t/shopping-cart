import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div>
      <h1>This page doesn&apos;t exist.</h1>
      <p>Our apologies, we encountered an unexpected error.</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default ErrorPage;
