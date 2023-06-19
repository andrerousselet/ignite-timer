import { useContext } from "react";
import { NewTimerForm } from "./components/NewTimerForm";
import { Countdown } from "./components/Countdown";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HandPalm, Play } from "@phosphor-icons/react";
import { HomeContainer, StartButton, StopButton } from "./styles";
import { TimerContext } from "../../contexts/TimerContext";

const newTimerFormSchema = z.object({
  task: z.string().min(1, "Informe a tarefa"),
  minutesAmount: z.number().min(1).max(60),
});

type NewTimerFormData = z.infer<typeof newTimerFormSchema>;

export function Home() {
  const { activeTimer, createNewTimer, stopTimer } = useContext(TimerContext);
  const newTimerForm = useForm<NewTimerFormData>({
    resolver: zodResolver(newTimerFormSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newTimerForm;

  function handleCreateNewTimer(data: NewTimerFormData) {
    createNewTimer(data);
    reset();
  }

  const task = watch("task");
  const minutesAmount = watch("minutesAmount");
  const isSubmitDisabled = !task || !minutesAmount;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewTimer)} action="">
        <FormProvider {...newTimerForm}>
          <NewTimerForm />
        </FormProvider>
        <Countdown />
        {activeTimer ? (
          <StopButton onClick={stopTimer} type="button">
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
