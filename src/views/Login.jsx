import Navbar from './partials/Navbar.jsx';
import LoginForm from "./partials/LoginForm.jsx";

import styles from '../styles/LoginPage.module.css';

const Login = () => {
  return (
    <div className={styles.loginPage}>
    <Navbar/>
    <main>
      <LoginForm />
    </main>
    </div>
  );
};

export default Login;
