
import { useEffect, useContext } from 'react';
import UserContext from '../../UserContext';
import styles from '../../styles/Navbar.module.css';
import { Link } from 'react-router';

const Navbar = () => {

  const { profile, isLoggedIn, setProfile, setIsLoggedIn } = useContext(UserContext);

    useEffect(() => {
    try {
      const token = sessionStorage.getItem("msgAppToken");
      if (token) {
        fetch(
          `${import.meta.env.VITE_FETCH_BASE_URL}/profile/get-user-profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            method: "GET",
          }
        )
          .then((res) => res.json())
          .then((res) => {
            if(res.profile) {
              setProfile(res.profile);
              setIsLoggedIn(true);
            } else {
              setIsLoggedIn(false);
            }

          });
      }
    } catch (err) {
      console.error(err);
      setIsLoggedIn(false);
    }
  }, []);


  return (
    <header>
      <nav className={styles.navbar}>
      <div className={styles.linksCont}>
        <Link to={'/'}>Home</Link>
        {profile ? null : (
          <>
        <Link to={'/login'}>Login</Link>
        <Link to={'/register'}>Register</Link>
          </>
        )}

        {!profile ? null : (
        <>
        <Link to={'/channel/myhome'}>My Home</Link>
        <Link to={'/logout'}>Logout</Link>
        </>
        )}
      
      </div>
      {!profile ? null : (
        <div className={styles.profileCont}>Welcome {profile.profileName}</div>

      )}
      </nav>
    </header>
  )
};


export default Navbar;