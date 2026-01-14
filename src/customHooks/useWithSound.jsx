import { useRef, useEffect } from "react";

export const useWithSound = (audioSource) => {
  const soundRef = useRef();

  const playSound = () => {
    soundRef.current.play();
  };

  const pauseSound = () => {
    soundRef.current.play();
  };

  useEffect(() => {
    soundRef.current = new Audio(audioSource);
  }, []);

  return {
    playSound,
    pauseSound,
  }
};