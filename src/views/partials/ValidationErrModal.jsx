import styles from "../../styles/ValidationErrModal.module.css";

const ValidationErrModal = ({msgFormErrors, closeMsgHandler}) => {
  return (
    <div onClick={closeMsgHandler} className={`${styles.msgFormErrBackground} closeValidationErrModal`}>
      <div className={styles.msgFormErrorCont}>
        <button
          onClick={closeMsgHandler}
          className={`${styles.exitErrMsgBtn} closeValidationErrModal`}
          type="button"
        >
          X
        </button>
        <h3>Please fix</h3>
        <ul className={styles.msgFormErrUl}>
          {msgFormErrors.map((msgFormErr, errIndx) => {
            return <li key={`error${errIndx}`}>{msgFormErr.msg}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default ValidationErrModal;
