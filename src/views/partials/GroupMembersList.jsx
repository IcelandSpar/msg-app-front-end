import { Link } from "react-router";

import styles from "../../styles/GroupMembersList.module.css";
import crownIcon from "../../assets/crown_icon.svg";

const GroupMembersList = ({ groupMembers }) => {
  return (
    <div className={styles.groupMembersListCont}>
      <h4 className={styles.groupMemberHeaders}>Admins</h4>
      <ul className={styles.memberUls}>
        {groupMembers.adminRoleMembers.map((admin, indx) => {
          return (
            <li className={styles.memberLis}>
              <Link to={`/profile/${admin.member.id}`}>
                <img
                  className={styles.memberProfileImg}
                  src={`${import.meta.env.VITE_FETCH_BASE_URL}/${
                    admin.member.profileImgFilePath
                  }`}
                  alt={`${admin.member.profileName}'s profile picture`}
                  width={"25px"}
                  height={"25px"}
                />
              </Link>
              <p>{admin.member.profileName}</p>
              <img
                className={styles.adminCrownIcon}
                src={crownIcon}
                alt="crown"
              />
            </li>
          );
        })}
      </ul>
      <h4 className={styles.groupMemberHeaders}>Members</h4>
      <ul className={styles.memberUls}>
        {groupMembers.userRoleMembers.map((member, indx) => {
          return (
            <li className={styles.memberLis} key={member.member.id}>
              <Link to={`/profile/${member.member.id}`}>
                <img
                  className={styles.memberProfileImg}
                  src={`${import.meta.env.VITE_FETCH_BASE_URL}/${
                    member.member.profileImgFilePath
                  }`}
                  alt={`${member.member.profileName}'s profile picture`}
                  width={"25px"}
                  height={"25px"}
                />
              </Link>

              <p>{member.member.profileName}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GroupMembersList;
