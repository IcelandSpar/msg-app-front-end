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
