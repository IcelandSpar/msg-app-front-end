import styles from "../../styles/GroupMembersList.module.css";

const GroupMembersList = ({groupMembers}) => {
  return (
    <div className={styles.groupMembersListCont}>
      <h4>Admins</h4>
      <ul className={styles.memberUls}>
      {groupMembers.userRoleMembers.map((member, indx) => {
        return (
           <li className={styles.memberLis} key={member.member.id}>
            <img className={styles.memberProfileImg} src={`${import.meta.env.VITE_FETCH_BASE_URL}/${member.member.profileImgFilePath}`} alt={`${member.member.profileName}'s profile picture`} width={'25px'} height={'25px'} />
            <p>{member.member.profileName}</p>
           </li>
        )
      })}

      </ul>
      <h4>Members</h4>
      <ul className={styles.memberUls}>

      </ul>
    </div>
  )
};

export default GroupMembersList;