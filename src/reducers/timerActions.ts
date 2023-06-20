import { Timer } from "../contexts/TimerContext";

export enum ActionTypes {
  START_NEW_TIMER = "START_NEW_TIMER",
  STOP_CURRENT_TIMER = "STOP_CURRENT_TIMER",
  FINISH_CURRENT_TIMER = "FINISH_CURRENT_TIMER"
}

export function startNewTimerAction(newTimer: Timer) {
  return { type: ActionTypes.START_NEW_TIMER, payload: newTimer }
}

export function stopTimerAction() {
  return { type: ActionTypes.STOP_CURRENT_TIMER }
}

export function finishCurrentTimerAction() {
  return { type: ActionTypes.FINISH_CURRENT_TIMER }
}