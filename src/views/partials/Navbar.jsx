
import { useEffect, useContext } from 'react';
import UserContext from '../../UserContext';
import styles from '../../styles/Navbar.module.css';
import { Link } from 'react-router';

const Navbar = () => {

  const { profile, isLoggedIn } = useContext(UserContext)


  return (
    <header>
      <nav>
      <div className={styles.linksCont}></div>
      <div className={styles.profileCont}>Welcome {profile.profileName}</div>
      </nav>
    </header>
  )
};


export default Navbar;