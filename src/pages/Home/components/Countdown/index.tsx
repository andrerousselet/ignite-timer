import { useContext, useEffect } from "react";
import { CountdownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { TimerContext } from "../../../../contexts/TimerContext";

export function Countdown() {
  const {
    activeTimer,
    activeTimerId,
    finishCurrentTimer,
    secondsPassed,
    handleSetSecondsPassed,
  } = useContext(TimerContext);

  const totalSeconds = activeTimer ? activeTimer.minutesAmount * 60 : 0;
  const currentSeconds = activeTimer ? totalSeconds - secondsPassed : 0;
  const currentMinutes = Math.floor(currentSeconds / 60);
  const currentSecondsLeft = currentSeconds % 60;

  const minutesDisplay = String(currentMinutes).padStart(2, "0");
  const secondsDisplay = String(currentSecondsLeft).padStart(2, "0");

  useEffect(() => {
    let interval: number;
    if (activeTimer) {
      interval = setInterval(() => {
        const secondsDiff = differenceInSeconds(
          new Date(),
          new Date(activeTimer.startDate)
        );

        if (secondsDiff >= totalSeconds) {
          finishCurrentTimer();
          handleSetSecondsPassed(totalSeconds);
          clearInterval(interval);
        } else {
          handleSetSecondsPassed(secondsDiff);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [
    activeTimer,
    totalSeconds,
    activeTimerId,
    finishCurrentTimer,
    handleSetSecondsPassed,
  ]);

  useEffect(() => {
    if (activeTimer) {
      document.title = `${minutesDisplay}:${secondsDisplay}`;
    }
  }, [activeTimer, minutesDisplay, secondsDisplay]);

  return (
    <CountdownContainer>
      <span>{minutesDisplay[0]}</span>
      <span>{minutesDisplay[1]}</span>
      <Separator>:</Separator>
      <span>{secondsDisplay[0]}</span>
      <span>{secondsDisplay[1]}</span>
    </CountdownContainer>
  );
}
