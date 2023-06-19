import { useContext } from "react";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useFormContext } from "react-hook-form";
import { TimerContext } from "../../../../contexts/TimerContext";

export function NewTimerForm() {
  const { activeTimer } = useContext(TimerContext);
  const { register } = useFormContext();

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeTimer}
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
        disabled={!!activeTimer}
        {...register("minutesAmount", { valueAsNumber: true })}
      />
      <span>minutos.</span>
    </FormContainer>
  );
}
