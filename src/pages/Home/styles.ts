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

export const FormContainer = styled.div`
  align-items: center;
  color: ${props => props.theme["gray-100"]};
  display: flex;
  flex-wrap: wrap;
  font-size: 1.125rem;
  font-weight: bold;
  gap: 0.5rem;
  justify-content: center;
  width: 100%;
`;

export const CountdownContainer = styled.div`
  color: ${props => props.theme["gray-100"]};
  display: flex;
  font-family: "Roboto Mono", monospace;
  font-size: 10rem;
  gap: 1rem;
  line-height: 8rem;

  span {
    background-color: ${props => props.theme["gray-700"]};
    border-radius: 8px;
    padding: 2rem 1rem;
  }
`;

export const Separator = styled.div`
  align-items: center;
  color: ${props => props.theme["green-500"]};
  display: flex;
  justify-content: center;
  overflow: hidden;
  padding: 2rem 0;
  width: 4rem;
`

export const StartButton = styled.button`
  align-items: center;
  background-color: ${props => props.theme["green-500"]};
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

  &:not(:disabled):hover {
    background-color: ${props => props.theme["green-700"]};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`