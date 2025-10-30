import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import moreVertIcon from "../../assets/more_vert_icon.svg";
import LoadingIcon from "./LoadingIcon.jsx";

import styles from "../../styles/GroupList.module.css";

const GroupList = ({
  groups,
  handleClickOnGroupLi,
  isLoadingGroupList,
  isUserHomeList = false,
}) => {
  return (
    <section className={styles.groupListSect}>
      <div className={styles.groupHeadingAndNoGroupParaCont}>
        <h3 className={styles.groupsHeading}>Groups</h3>
        {!isLoadingGroupList ? null : <LoadingIcon />}
        {groups && groups.length <= 0 ? (
          <div className={styles.noGroupsParaCont}>
            <p>(╥﹏╥)</p>
            <p className={styles.groupsPara}>No groups found...</p>
          </div>
        ) : null}
      </div>
      {!groups ? null : (
        <ul className={styles.groupUlCont}>
          {groups.map((groupInfo, indx) => {
            return (
              <li
                key={groupInfo.group.id}
                onClick={(e) => handleClickOnGroupLi(e, groupInfo.group.id)}
                className={`${styles.groupLiCont} navigateToGroupChat`}
              >
                <div className={`${styles.groupImgAndNameCont} navigateToGroupChat`}>
                  <img
                    className={`${styles.groupImg} navigateToGroupChat`}
                    width={"25px"}
                    height={"25px"}
                    src={`${import.meta.env.VITE_FETCH_BASE_URL}/${
                      groupInfo.group.groupImgPath
                    }`}
                    alt={`${groupInfo.groupName} Group Chat Image`}
                  />
                  <h3 className={'navigateToGroupChat'}>{groupInfo.group.groupName}</h3>
                </div>
                {!isUserHomeList ? null : (
                  <button className={styles.moreOptsBtn} type="button">
                    <img src={moreVertIcon} alt="more options" />
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default GroupList;
