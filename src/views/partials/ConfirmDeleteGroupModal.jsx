import { useContext } from "react";
import UserContext from "../../UserContext.jsx";

import he from "he";
import styles from "../../styles/ConfirmDeleteGroupModal.module.css";

const ConfirmDeleteGroupModal = ({ handleOpenConfirmDeleteModal, groupInfo, setMemberGroups }) => {

  const { profile } = useContext(UserContext);

  const handleDeleteGroup = (e, profileId, groupInfo) => {
    e.preventDefault();
    const token = sessionStorage.getItem('msgAppToken');
    if(token) {
      fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/group-actions/delete-group/${profileId}/${groupInfo.groupId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: "DELETE",
      })
      .then((res) => res.json())
      .then((res) => {
        if(res.success && res.memberGroups) {
          setMemberGroups(() => res.memberGroups);
        } else if(!res.success) {
          console.log(res.message);
          handleOpenConfirmDeleteModal(e);
        }
      })
      .catch((err) => console.error(err));
    }

  };

  return (
    <div className={styles.confirmLeaveBackground}>
      <div className={styles.confirmLeaveModal}>
        <p className={styles.deleteQuestionParas}>Are you sure you want to <b>permanently delete</b></p>
        <p className={styles.groupName}><b>{he.decode(groupInfo.group.groupName)}?</b></p>
        <p>All messages will be deleted!</p>
        <img className={styles.groupImg} src={`${import.meta.env.VITE_FETCH_BASE_URL}/${groupInfo.group.groupImgPath}`} alt="group image" width={'100px'} height={'100px'}/>
        <div className={styles.leaveBtnsCont}>
          <button onClick={handleOpenConfirmDeleteModal} className={styles.noLeaveBtn} type="button">Nevermind</button>
          <button onClick={(e) => handleDeleteGroup(e, profile.id, groupInfo)} className={styles.yesLeaveBtn} type="button">Delete Group</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteGroupModal;
