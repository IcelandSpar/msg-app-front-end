
import { useWithSound } from "../../customHooks/useWithSound";

import soundTestIcon from "../../assets/msg_notif_sound.svg";

const SoundTestBtn = ({ styles, sound }) => {
  const { playSound, pauseSound } = useWithSound(sound);

  const handleClickTestBtn = (e) => {
    e.preventDefault();
    pauseSound();
    playSound();
  };

  return (
    <button onClick={handleClickTestBtn} type="button" className={styles.groupOptsBtn}>
      <img src={soundTestIcon} alt="sound test" width={"24px"} height={"24px"}/>
      <p>Test</p>
    </button>
  );
};

export default SoundTestBtn;
