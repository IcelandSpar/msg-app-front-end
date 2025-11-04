import styles from "../../styles/CharacterCount.module.css";


const CharacterCount = ({ wordLimitCont,characterCount, isUserTyping}) => {
  return (
    <div
      ref={wordLimitCont}
      className={`${styles.characterCountCont} ${
        isUserTyping ? `${styles.fadeOut}` : `${styles.fadeIn}`
      }`}
    >
      {characterCount}/2000
    </div>
  );
};

export default CharacterCount;
