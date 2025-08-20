import { socket } from "../../socket";
import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router";
import UserContext from "../../UserContext";
import styles from '../../styles/LoginForm.module.css';

const LoginForm = () => {
  const [loginErr, setLoginErr] = useState(null);

  const usernameInput = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  const user = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginErr(null);
    const formData = new FormData();
    formData.append("username", usernameInput.current.value);
    formData.append("password", passwordRef.current.value);

    fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/login`, {
      method: "POST",
      body: new URLSearchParams(formData),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.token) {
          sessionStorage.setItem("msgAppToken", res.token);
          socket.connect();
          navigate("/channel/myhome");
        } else if (res.message) {
          setLoginErr(res.message);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      {console.log(user)}
      {!loginErr ? null : (
        <div>
          <h3>Please Fix:</h3>
          <p>{loginErr}</p>
        </div>
      )}
      <fieldset className={styles.loginFieldset}>
        <legend>Login</legend>
        <div className={styles.labelAndInputCont}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            ref={usernameInput}
          />
        </div>
        <div className={styles.labelAndInputCont}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" ref={passwordRef} />
        </div>
      </fieldset>

      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginForm;
