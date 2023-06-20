import {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { TimersState, timerReducer } from "../reducers/timerReducer";
import {
  finishCurrentTimerAction,
  startNewTimerAction,
  stopTimerAction,
} from "../reducers/timerActions";
import { differenceInSeconds } from "date-fns";

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
  secondsPassed: number;
  createNewTimer: (data: NewTimerData) => void;
  stopTimer: () => void;
  finishCurrentTimer: () => void;
  handleSetSecondsPassed: (seconds: number) => void;
}

export const TimerContext = createContext({} as TimerContextType);

interface TimerContextProviderProps {
  children: ReactNode;
}

const initialState: TimersState = {
  timers: [],
  activeTimerId: null,
};

export function TimerContextProvider({ children }: TimerContextProviderProps) {
  const [timersState, dispatch] = useReducer(
    timerReducer,
    initialState,
    (initState) => {
      const JSONStoredTimers = localStorage.getItem(
        "@ignite-timer:timers-state:1.0.0"
      );
      if (JSONStoredTimers) return JSON.parse(JSONStoredTimers);
      return initState;
    }
  );
  const { timers, activeTimerId }: TimersState = timersState;
  const activeTimer = timers.find((timer) => timer.id === activeTimerId);
  const [secondsPassed, setSecondsPassed] = useState(() => {
    if (activeTimer) {
      return differenceInSeconds(new Date(), new Date(activeTimer.startDate));
    }
    return 0;
  });

  useEffect(() => {
    const timersJSON = JSON.stringify(timersState);
    localStorage.setItem("@ignite-timer:timers-state:1.0.0", timersJSON);
  }, [timersState]);

  function createNewTimer(data: NewTimerData) {
    const newTimer: Timer = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };
    dispatch(startNewTimerAction(newTimer));
    setSecondsPassed(0);
  }

  function stopTimer() {
    dispatch(stopTimerAction());
  }

  function finishCurrentTimer() {
    dispatch(finishCurrentTimerAction());
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
