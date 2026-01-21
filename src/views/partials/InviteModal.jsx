
import { handleInviteModal } from "../../utils/groupSettings.js";
import styles from "../../styles/InviteModal.module.css";

const InviteModal = ({ setIsInviteModalOpen }) => {


  return (
    <div className={styles.inviteModalBackground}>
      <div className={styles.inviteModal}>
        <button onClick={(e) => handleInviteModal(e, setIsInviteModalOpen)} className={styles.exitInviteBtn}>X</button>
        <h3>Invite to group</h3>
        <form>

        </form>
      </div>
    </div>
  )
};

export default InviteModal;