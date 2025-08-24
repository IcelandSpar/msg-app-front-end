import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";

import UserContext from "../UserContext";

const Logout = () => {

  const navigate = useNavigate();
  const { setProfile, setIsLoggedIn } = useContext(UserContext);

  useEffect(() => {
    sessionStorage.removeItem('msgAppToken');
    setProfile(null);
    setIsLoggedIn(false);
    navigate('/');
  }, []);

  return (
    <>
    <p>Logging Out...</p>
    </>
  )
};


export default Logout;