import Navbar from './partials/Navbar.jsx';

import styles from '../styles/DefaultHome.module.css';

const DefaultHome = () => {
  return (
    <div className={styles.defaultHomePage}>
    <Navbar/>
    <main>
    <h1>This is the home page</h1>
    </main>
    </div>
  )
};

export default DefaultHome;