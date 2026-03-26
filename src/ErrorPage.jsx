import { Link } from "react-router";
import styles from "./ErrorPage.module.css";

const ErrorPage = () => {
  return (
    <div className={styles["container"]}>
      <h1>This page doesn&apos;t exist.</h1>
      <p>Our apologies, we encountered an unexpected error.</p>
      <Link to="/">
        <button className={styles["home-button"]}>Go to Home</button>
      </Link>
    </div>
  );
};

export default ErrorPage;
