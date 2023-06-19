import { styled } from "styled-components";

export const HeaderContainer = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;

  nav {
    display: flex;
    gap: 0.5rem;

    a {
      align-items: center;
      border-bottom: 3px solid transparent;
      border-top: 3px solid transparent;
      color: ${props => props.theme["gray-100"]};
      display: flex;
      height: 3rem;
      justify-content: center;
      width: 3rem;

      &:hover {
        border-bottom: 3px solid ${props => props.theme["green-500"]};
      }

      &.active {
        color: ${props => props.theme["green-500"]};
      }
    }
  }
`;