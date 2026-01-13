import { useState } from "react";

import styles from "../../styles/MessageImage.module.css";

const MessageImage = ({ msg }) => {

  const [ toggleZoomIn, setToggleZoomIn ] = useState(false);

  const handleClickOnImg =(e) => {
    e.preventDefault();
    if(!toggleZoomIn) {
      setToggleZoomIn((prev) => !prev);
    } else if(toggleZoomIn && Array.from(e.target.classList)[1] == 'closeZoomedImg') {
      setToggleZoomIn(false);
    }
  };

  return (
    <div
      onClick={handleClickOnImg}
      className={`${styles.msgImgCont} closeZoomedImg ${
        toggleZoomIn ? styles.toggleZoomImgBackground : styles.toggleZoomOutImgBackground
      }`}
    >
     {/* <a className={toggleZoomIn ? styles.downloadImgLink : styles.toggleInvisibleDownload} download={`${import.meta.env.VITE_FETCH_BASE_URL}/${msg.attatchedImagePath}`}><button>Download</button></a> */}
      <img
        className={`${styles.msgImg} ${
          toggleZoomIn ? styles.toggleZoomImg : styles.toggleZoomOutImg
        }`}
        src={`${import.meta.env.VITE_FETCH_BASE_URL}/${msg.attatchedImagePath}`}
        alt="image"
      />
    </div>
  );
};

export default MessageImage;
