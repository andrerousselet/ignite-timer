import { ReactNode, createContext, useState } from "react";

interface NewTimerData {
  task: string;
  minutesAmount: number;
}

export interface Timer {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  stopDate?: Date;
  finishDate?: Date;
}

interface TimerContextType {
  timers: Timer[];
  activeTimer: Timer | undefined;
  activeTimerId: string | null;
  finishCurrentTimer: () => void;
  secondsPassed: number;
  handleSetSecondsPassed: (seconds: number) => void;
  createNewTimer: (data: NewTimerData) => void;
  stopTimer: () => void;
}

export const TimerContext = createContext({} as TimerContextType);

interface TimerContextProviderProps {
  children: ReactNode;
}

export function TimerContextProvider({ children }: TimerContextProviderProps) {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [activeTimerId, setActiveTimerId] = useState<string | null>(null);
  const [secondsPassed, setSecondsPassed] = useState(0);

  const activeTimer = timers.find((timer) => timer.id === activeTimerId);

  function createNewTimer(data: NewTimerData) {
    const newTimer: Timer = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };
    setTimers((prevTimers) => [...prevTimers, newTimer]);
    setActiveTimerId(newTimer.id);
    setSecondsPassed(0);
    // reset();
  }

  function stopTimer() {
    setTimers((prevTimers) =>
      prevTimers.map((timer) => {
        if (timer.id === activeTimerId) {
          return { ...timer, stopDate: new Date() };
        } else {
          return timer;
        }
      })
    );
    setActiveTimerId(null);
  }

  function finishCurrentTimer() {
    setTimers((prevTimers) =>
      prevTimers.map((timer) => {
        if (timer.id === activeTimerId) {
          return { ...timer, stopDate: new Date() };
        } else {
          return timer;
        }
      })
    );
  }

  function handleSetSecondsPassed(seconds: number) {
    setSecondsPassed(seconds);
  }

  return (
    <TimerContext.Provider
      value={{
        timers,
        activeTimer,
        activeTimerId,
        finishCurrentTimer,
        secondsPassed,
        handleSetSecondsPassed,
        createNewTimer,
        stopTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}
