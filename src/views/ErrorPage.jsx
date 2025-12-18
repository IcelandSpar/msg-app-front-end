import { Link } from "react-router";

import Navbar from "./partials/Navbar.jsx";

import styles from "../styles/ErrorPage.module.css";


const ErrorPage = () => {
  return (
    <div className={styles.errorPage}>
      <div className={styles.navbarCont}>
        <Navbar/>
      </div>
      <main className={styles.mainErrorCont}>
        <div className={styles.headingLinkCont}>
          <p>(⌒_⌒;)</p>
          <h2>This page doesn't exist...</h2>
          <p>Something went wrong...</p>
          <Link to={'/'}><p>Go Home</p></Link>
        </div>
      </main>
    </div>
  )
};

export default ErrorPage;