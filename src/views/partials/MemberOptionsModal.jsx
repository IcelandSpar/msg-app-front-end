import he from "he";

import styles from "../../styles/GroupChatMain.module.css";

import crownIcon from "../../assets/crown_icon.svg";
import unfriendIcon from "../../assets/unfriend_icon.svg";


const MemberOptionsModal = ({ handleMemberOptsModal, handleRemoveMember, isMemberOptsOpen, handlePromoteMember, profile }) => {
  return (
          <div onClick={(e) => handleMemberOptsModal(e)} className={`${styles.memberOptsModalBackground} closeMemberOptsModal`}>
            <div className={styles.memberOptsModal}>
              <button
                onClick={(e) => handleMemberOptsModal(e)}
                type="button"
                className={`${styles.exitOptsBtn} closeMemberOptsModal`}
              >
                X
              </button>
              <ul className={styles.optionsModalUl}>
                <li className={styles.optionsModalLi}>
                  <p className={styles.questionAndProfileImg}>
                    Remove{" "}
                    <img
                      className={styles.memberOptsProfileImg}
                      src={`${import.meta.env.VITE_FETCH_BASE_URL}/${
                        isMemberOptsOpen.member.profileImgFilePath
                      }`}
                      alt="User profile image"
                      width={"20"}
                      height={"20px"}
                    />
                    {`${he.decode(isMemberOptsOpen.member.profileName)}`} from the group?
                  </p>

                  <button
                    className={styles.removeMemberBtn}
                    onClick={(e) =>
                      handleRemoveMember(e, isMemberOptsOpen, profile.id)
                    }
                    type="button"
                  >
                    <p>Remove</p>
                    <img src={unfriendIcon} alt="remove" />
                  </button>
                </li>
                {isMemberOptsOpen.role == "USER" ? (
                  <li className={styles.optionsModalLi}>
                    <p className={styles.questionAndProfileImg}>
                      Promote{" "}
                      <img
                        className={styles.memberOptsProfileImg}
                        src={`${import.meta.env.VITE_FETCH_BASE_URL}/${
                          isMemberOptsOpen.member.profileImgFilePath
                        }`}
                        alt="User profile image"
                        width={"20px"}
                        height={"20px"}
                      />
                      {`${he.decode(isMemberOptsOpen.member.profileName)}`} to admin?
                    </p>

                    <button
                      type="button"
                      onClick={(e) =>
                        handlePromoteMember(e, isMemberOptsOpen, profile.id)
                      }
                      className={styles.memberOptsBtn}
                    >
                      <p>Promote</p>
                      <img src={crownIcon} alt="admin crown" />
                    </button>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
  )
};

export default MemberOptionsModal;