import { useContext } from "react";
import { TimerContext } from "../../contexts/TimerContext";
import { formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { HistoryContainer, HistoryList, Status } from "./styles";

export function History() {
  const { timers } = useContext(TimerContext);

  return (
    <HistoryContainer>
      <h1>Meu Histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {timers.map((timer) => (
              <tr key={timer.id}>
                <td>{timer.task}</td>
                <td>{timer.minutesAmount} minutos</td>
                <td>
                  {formatDistanceToNow(timer.startDate, {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </td>
                <td>
                  {timer.finishDate && (
                    <Status statusColor="green">Concluído</Status>
                  )}
                  {timer.stopDate && (
                    <Status statusColor="red">Interrompido</Status>
                  )}
                  {!timer.finishDate && !timer.stopDate && (
                    <Status statusColor="yellow">Em andamento</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
