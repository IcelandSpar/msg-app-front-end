
import { handleInviteModal, handleCloseInviteModal } from "../../utils/groupSettings.js";

import styles from "../../styles/InviteModal.module.css";
import waveHandIcon from "../../assets/waving_hand_icon.svg";

const InviteModal = ({ setIsInviteModalOpen }) => {


  return (
    <div onClick={(e) => handleCloseInviteModal(e, setIsInviteModalOpen)} className={`${styles.inviteModalBackground} closeGroupInviteModal`}>
      <div className={styles.inviteModal}>
        <button onClick={(e) => handleInviteModal(e, setIsInviteModalOpen)} className={styles.exitInviteBtn}>X</button>
        <h3 className={styles.inviteModalHeader}>Invite to Group</h3>
        <form className={styles.inviteForm}>
          <div className={styles.labelAndInputCont}>
            <label className={styles.friendCodeLabel} htmlFor="friendCode">Friend Code</label>
            <input className={styles.friendCodeInput} name="friendCode" id="friendCode" type="text" />
          </div>
          <button className={styles.inviteBtn} type="button">
            <p className={styles.inviteBtnPara}>Invite</p>
            <img className={styles.wavingHandIcon} src={waveHandIcon} alt="waving hand" />
          </button>
        </form>
      </div>
    </div>
  )
};

export default InviteModal;