import { useState } from "react";

import OptionsMenu from "./OptionsMenu.jsx"

import moreVertIcon from "../../assets/more_vert_icon.svg";

const GroupListItem = ({
  styles,
  groupInfo,
  isUserHomeList,
  handleClickOnGroupLi,
}) => {
    const [ isOptsOpen, setIsOptsOpen ] = useState(false);
  
    const handleOptsBtn = (e) => {
      e.preventDefault();
      setIsOptsOpen((prev) => !prev);
    }
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
        <h3 className={"navigateToGroupChat"}>{groupInfo.group.groupName}</h3>
      </div>
      {!isUserHomeList ? null : (
        <button
          onClick={handleOptsBtn}
          className={styles.moreOptsBtn}
          type="button"
        >
          <img src={moreVertIcon} alt="more options" />
          {!isOptsOpen ? null : <OptionsMenu/>}
        </button>
      )}
    </li>
  );
};

export default GroupListItem;
