import Navbar from './partials/Navbar.jsx';
import RegisterForm from "./partials/RegisterForm";
import styles from '../styles/Register.module.css';

const Register = () => {
  return (
    <div className={styles.registerPage}>
    <Navbar/>
    <main className={styles.registerMainCont}>
      <RegisterForm />
    </main>
    </div>
  );
};

export default Register;
