import { createContext, useState } from "react";
import { NewTimerForm } from "./components/NewTimerForm";
import { Countdown } from "./components/Countdown";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HandPalm, Play } from "@phosphor-icons/react";
import { HomeContainer, StartButton, StopButton } from "./styles";

const newTimerFormSchema = z.object({
  task: z.string().min(1, "Informe a tarefa"),
  minutesAmount: z.number().min(1).max(60),
});

type NewTimerFormData = z.infer<typeof newTimerFormSchema>;

export interface Timer {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  stopDate?: Date;
  finishDate?: Date;
}

interface TimerContextType {
  activeTimer: Timer | undefined;
  activeTimerId: string | null;
  finishCurrentTimer: () => void;
  secondsPassed: number;
  handleSetSecondsPassed: (seconds: number) => void;
}

export const TimerContext = createContext({} as TimerContextType);

export function Home() {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [activeTimerId, setActiveTimerId] = useState<string | null>(null);
  const [secondsPassed, setSecondsPassed] = useState(0);

  const newTimerForm = useForm<NewTimerFormData>({
    resolver: zodResolver(newTimerFormSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newTimerForm;

  const activeTimer = timers.find((timer) => timer.id === activeTimerId);

  function handleCreateNewTimer(data: NewTimerFormData) {
    const newTimer: Timer = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };
    setTimers((prevTimers) => [...prevTimers, newTimer]);
    setActiveTimerId(newTimer.id);
    setSecondsPassed(0);
    reset();
  }

  function handleStopTimer() {
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

  const task = watch("task");
  const minutesAmount = watch("minutesAmount");
  const isSubmitDisabled = !task || !minutesAmount;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewTimer)} action="">
        <TimerContext.Provider
          value={{
            activeTimer,
            activeTimerId,
            finishCurrentTimer,
            secondsPassed,
            handleSetSecondsPassed,
          }}
        >
          <FormProvider {...newTimerForm}>
            <NewTimerForm />
          </FormProvider>
          <Countdown />
        </TimerContext.Provider>
        {activeTimer ? (
          <StopButton onClick={handleStopTimer} type="button">
            <HandPalm size={24} />
            Interromper
          </StopButton>
        ) : (
          <StartButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartButton>
        )}
      </form>
    </HomeContainer>
  );
}
