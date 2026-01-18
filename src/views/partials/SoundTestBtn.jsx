
import { useWithSound } from "../../customHooks/useWithSound";

const SoundTestBtn = ({ styles, sound }) => {
  const { playSound, pauseSound } = useWithSound(sound);

  const handleClickTestBtn = (e) => {
    e.preventDefault();
    pauseSound();
    playSound();
  };

  return (
    <button onClick={handleClickTestBtn} type="button" className={styles.groupOptsBtn}>
      <p>Test</p>
    </button>
  );
};

export default SoundTestBtn;
