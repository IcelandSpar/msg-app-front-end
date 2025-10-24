import loadingIcon from "../../assets/loading_icon.png";
import styles from "../../styles/LoadingIcon.module.css";

const LoadingIcon = () => {
  return (
    <a
      className={styles.loadingCont}
      href="https://www.flaticon.com/free-icons/restart"
    >
      <img
        className={styles.loadingIcon}
        src={loadingIcon}
        alt="loading"
        width={"30%"}
      />
    </a>
  );
};

export default LoadingIcon;
