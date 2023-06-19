import { Play } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartButton,
  TaskInput,
} from "./styles";
import { useState } from "react";

const newTimerFormSchema = z.object({
  task: z.string().min(1, "Informe a tarefa"),
  minutesAmount: z.number().min(5).max(60),
});

type NewTimerFormData = z.infer<typeof newTimerFormSchema>;

interface Timer {
  id: string;
  task: string;
  minutesAmount: number;
}

export function Home() {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [activeTimerId, setActiveTimerId] = useState<string | null>(null);
  const [secondsPassed, setSecondsPassed] = useState(0);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    // formState: { errors },
  } = useForm<NewTimerFormData>({
    resolver: zodResolver(newTimerFormSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  function handleCreateNewTimer(data: NewTimerFormData) {
    const newTimer: Timer = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
    };
    setTimers((prevTimers) => [...prevTimers, newTimer]);
    setActiveTimerId(newTimer.id);
    reset();
  }

  const activeTimer = timers.find((timer) => timer.id === activeTimerId);

  const totalSeconds = activeTimer ? activeTimer.minutesAmount * 60 : 0;
  const currentSeconds = activeTimer ? totalSeconds - secondsPassed : 0;
  const currentMinutes = Math.floor(currentSeconds / 60);
  const currentSecondsLeft = currentSeconds % 60;

  const minutesDisplay = String(currentMinutes).padStart(2, "0");
  const secondsDisplay = String(currentSecondsLeft).padStart(2, "0");

  const task = watch("task");
  const minutesAmount = watch("minutesAmount");
  const isSubmitDisabled = !task || !minutesAmount;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewTimer)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register("task")}
          />
          <datalist id="task-suggestions">
            <option value="sugestão 1" />
            <option value="sugestão 2" />
            <option value="sugestão 3" />
            <option value="sugestão 4" />
            <option value="sugestão 5" />
          </datalist>
          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register("minutesAmount", { valueAsNumber: true })}
          />
          <span>minutos.</span>
        </FormContainer>
        <CountdownContainer>
          <span>{minutesDisplay[0]}</span>
          <span>{minutesDisplay[1]}</span>
          <Separator>:</Separator>
          <span>{secondsDisplay[0]}</span>
          <span>{secondsDisplay[1]}</span>
        </CountdownContainer>
        <StartButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartButton>
      </form>
    </HomeContainer>
  );
}
