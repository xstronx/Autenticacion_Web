import styled, { css } from "styled-components";

export const Button = styled.button`
  display: inline-block;
  width: fit-content;
  align-self: flex-start;
  justify-self: flex-start;
  padding: 10px 30px;
  border-radius: 100px;
  border: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.font.family};
  font-weight: 600;
  font-size: 0.95rem;
  transition: 0.3s ease all;

  ${({ variant, theme }) =>
    variant === "outline"
      ? css`
          background: transparent;
          color: ${theme.colors.primary};
          border: 1px solid ${theme.colors.primary};

          &:hover {
            background: ${theme.colors.primary};
            color: ${theme.colors.white};
          }
        `
      : css`
          background: ${theme.colors.primary};
          color: ${theme.colors.white};

          &:hover {
            background: ${theme.colors.primaryHover};
          }
        `}
`;

export default Button;