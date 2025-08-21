import { socket } from "./socket";
import { useState, useEffect, useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

import UserContext from "./UserContext.jsx";
import routes from "./routes.jsx";
import "./App.css";

function App() {
  const [profile, setProfile] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = createBrowserRouter(routes);

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
    <>
      <UserContext.Provider
        value={{ profile, setProfile, isLoggedIn, setIsLoggedIn }}
      >
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  );
}

export default App;
