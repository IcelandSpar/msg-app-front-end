import { Link } from "react-router";
import { useContext } from "react";
import he from "he";

import UserContext from "../../UserContext";

import crownIcon from "../../assets/crown_icon.svg";
import optionsBtnIcon from "../../assets/more_vert_icon.svg";
import styles from "../../styles/GroupMembersList.module.css";

const GroupMembersList = ({
  groupMembers,
  isDirectMessage = false,
  isAdmin = false,
  handleMemberOptsModal,
}) => {
  const { profile } = useContext(UserContext);

  return (
    <div className={styles.groupMembersListCont}>
      {isDirectMessage ? null : (
        <h4 className={styles.groupMemberHeaders}>Admins</h4>
      )}
      <ul className={styles.memberUls}>
        {groupMembers.adminRoleMembers.map((admin, indx) => {
          return (
            <li key={admin.member.id} className={styles.memberLis}>
              <div className={styles.imglinkAndName}>
                <Link
                  className={styles.imgLink}
                  to={`/profile/${admin.member.id}`}
                >
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
                <p className={styles.memberName}>
                  {he.decode(admin.member.profileName)}
                </p>
                <img
                  className={styles.adminCrownIcon}
                  src={crownIcon}
                  alt="crown"
                />
              </div>
              {isAdmin && profile.id != admin.profileId ? (
                <button
                  className={styles.memberOptsBtn}
                  onClick={(e) => handleMemberOptsModal(e, admin)}
                >
                  <img
                    className={styles.optionsBtn}
                    src={optionsBtnIcon}
                    alt="more options"
                  />
                </button>
              ) : null}
            </li>
          );
        })}
      </ul>
      <h4 className={styles.groupMemberHeaders}>Members</h4>
      <ul className={styles.memberUls}>
        {groupMembers.userRoleMembers.map((member, indx) => {
          return (
            <li className={styles.memberLis} key={member.member.id}>
              <div className={styles.imglinkAndName}>
                <Link
                  className={styles.imgLink}
                  to={`/profile/${member.member.id}`}
                >
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

                <p className={styles.memberName}>
                  {he.decode(member.member.profileName)}
                </p>
              </div>

              {isAdmin && profile.id != member.profileId ? (
                <button
                  className={styles.memberOptsBtn}
                  onClick={(e) => handleMemberOptsModal(e, member)}
                  type="button"
                >
                  <img
                    className={styles.optionsBtn}
                    src={optionsBtnIcon}
                    alt="more options"
                  />
                </button>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GroupMembersList;
