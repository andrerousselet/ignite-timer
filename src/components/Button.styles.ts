import { styled } from "styled-components";

export const ButtonContainer = styled.button`
  border: none;
  border-radius: 8px;
  color: ${props => props.theme.white};
  cursor: pointer;
  height: 50px;
  width: 100px;
  background-color: ${props => props.theme.primary};
`