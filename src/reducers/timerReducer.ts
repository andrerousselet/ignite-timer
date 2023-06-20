import { Timer } from "../contexts/TimerContext";
import { ActionTypes } from "./timerActions";

export interface TimersState {
  timers: Timer[],
  activeTimerId: string | null
}

export function timerReducer(state: TimersState, action: any) {
  switch (action.type) {
    case ActionTypes.START_NEW_TIMER:
      return {
        ...state,
        timers: [...state.timers, action.payload],
        activeTimerId: action.payload.id,
      }
    case ActionTypes.STOP_CURRENT_TIMER:
      return {
        ...state,
        timers: state.timers.map((timer) => {
          if (timer.id === state.activeTimerId) {
            return { ...timer, stopDate: new Date() };
          } else {
            return timer;
          }
        }),
        activeTimerId: null,
      }
    case ActionTypes.FINISH_CURRENT_TIMER:
      return {
        ...state,
        timers: state.timers.map((timer) => {
          if (timer.id === state.activeTimerId) {
            return { ...timer, finishDate: new Date() };
          } else {
            return timer;
          }
        }),
        activeTimerId: null,
      }
    default:
      return state;
  }
}