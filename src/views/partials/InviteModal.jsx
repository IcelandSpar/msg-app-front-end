
import { handleInviteModal } from "../../utils/groupSettings.js";
import styles from "../../styles/InviteModal.module.css";

const InviteModal = ({ setIsInviteModalOpen }) => {


  return (
    <div className={styles.inviteModalBackground}>
      <div className={styles.inviteModal}>
        <button onClick={(e) => handleInviteModal(e, setIsInviteModalOpen)} className={styles.exitInviteBtn}>X</button>
        <h3 className={styles.inviteModalHeader}>Invite to Group</h3>
        <form className={styles.inviteForm}>
          <div className={styles.labelAndInputCont}>
            <label>Friend Code</label>
            <input type="text" />
          </div>
          <button className={styles.inviteBtn} type="button">Invite</button>
        </form>
      </div>
    </div>
  )
};

export default InviteModal;