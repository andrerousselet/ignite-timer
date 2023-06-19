import { styled } from "styled-components";

export const HomeContainer = styled.main`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;

  form {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 3.5rem;
  }
`;

const BaseButton = styled.button`
  align-items: center;
  border: none;
  border-radius: 8px;
  color: ${props => props.theme["gray-100"]};
  cursor: pointer;
  display: flex;
  font-weight: bold;
  gap: 0.5rem;
  justify-content: center;
  padding: 1rem;
  transition: background-color 150ms;
  width: 100%;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const StartButton = styled(BaseButton)`
  background-color: ${props => props.theme["green-500"]};

  &:not(:disabled):hover {
    background-color: ${props => props.theme["green-700"]};
  }
`;

export const StopButton = styled(BaseButton)`
  background-color: ${props => props.theme["red-500"]};

  &:not(:disabled):hover {
    background-color: ${props => props.theme["red-700"]};
  }
`;