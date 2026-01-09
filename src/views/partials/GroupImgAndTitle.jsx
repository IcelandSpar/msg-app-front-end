import styles from "../../styles/GroupImgAndTitle.module.css";

const GroupImgAndTitle = ({ groupInfo, imgPixelSize = 50, fontSize = '1.5rem' }) => {
  return (
    <div className={styles.groupImgAndNameCont}>
      <img
        src={`${import.meta.env.VITE_FETCH_BASE_URL}/${groupInfo.groupImgPath}`}
        alt={`group image`}
        width={`${imgPixelSize}px`}
        height={`${imgPixelSize}px`}
      />
      <h3 style={{
        fontSize: fontSize,
      }}>{groupInfo.groupName}</h3>
    </div>
  );
};

export default GroupImgAndTitle;
