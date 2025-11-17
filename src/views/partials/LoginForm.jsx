import { socket } from "../../socket";
import { useRef, useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import UserContext from "../../UserContext";
import styles from "../../styles/LoginForm.module.css";

const LoginForm = () => {
  const [loginErr, setLoginErr] = useState(null);
  const [ validationErrors, setValidationErrors ] = useState(null);

  const usernameInput = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();


  const handleSubmit = (e) => {
    setValidationErrors(null);
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
        if(res.errors) {
          setValidationErrors(res.errors);
        } else if (res.token) {
          sessionStorage.setItem("msgAppToken", res.token);
          // socket.connect();

          navigate("/channel/myhome");
        } else if (res.message) {
          setLoginErr(res.message);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <fieldset className={styles.loginFieldset}>
        <legend>Login</legend>
        {!loginErr ? null : (
          <div className={styles.formSubmitErrCont}>
            <h3>Please Fix:</h3>
            <p>{loginErr}</p>
          </div>
        )}
        {!validationErrors ? null : (
          <div className={styles.formValidationErrorsCont}>
            <h3>Please Fix:</h3>
            <ul className={styles.formValidationErrUl}>
            {validationErrors.map((err, errIndx) => {
              return (
                <li key={`error${errIndx}`}>{err.msg}</li>
              )
            })}
            </ul>
          </div>
        )}
        <div className={styles.labelAndInputCont}>
          <label className={styles.formLabels} htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            ref={usernameInput}
            autoFocus
          />
        </div>
        <div className={styles.labelAndInputCont}>
          <label className={styles.formLabels} htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            ref={passwordRef}
          />
        </div>
        <div className={styles.noAccLinkCont}>
          <Link to={'/register'}>Don't have an account?</Link>
        </div>
        <div className={styles.btnCont}>
          <button className={styles.loginFormBtn} type="submit">
            Submit
          </button>
        </div>
      </fieldset>
    </form>
  );
};

export default LoginForm;
