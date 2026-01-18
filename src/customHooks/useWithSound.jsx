import { useRef, useEffect } from "react";
import sound1Asset from "../assets/msg_notif_4.wav";
import sound2Asset from "../assets/notification_sound.mp3";

export const useWithSound = (audioSource) => {
  const soundRef = useRef();
  const sound1 = useRef();
  const sound2 = useRef();

  const playSound = () => {
    soundRef.current.play();
  };

  const pauseSound = () => {
    soundRef.current.pause();
  };

  useEffect(() => {
    soundRef.current = new Audio(audioSource);
  }, []);

  return {
    playSound,
    pauseSound,
  }
};