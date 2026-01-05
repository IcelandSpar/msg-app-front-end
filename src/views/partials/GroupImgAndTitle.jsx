import styles from "../../styles/GroupImgAndTitle.module.css";

const GroupImgAndTitle = ({ groupInfo, imgPixelSize = 50 }) => {
  return (
    <div className={styles.groupImgAndNameCont}>
      <img
        src={`${import.meta.env.VITE_FETCH_BASE_URL}/${groupInfo.groupImgPath}`}
        alt={`group image`}
        width={`${imgPixelSize}px`}
        height={`${imgPixelSize}px`}
      />
      <h2>{groupInfo.groupName}</h2>
    </div>
  );
};

export default GroupImgAndTitle;
