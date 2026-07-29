import styled from "styled-components";

export const FormCard = styled.form`
  background: ${({ theme }) => theme.colors.dark};
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
  min-height: 10rem;
  margin: 3rem auto;
  max-width: 400px;
  padding: 2rem 1.5rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormTitle = styled.h1`
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  background: transparent;
  border: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  color: ${({ theme }) => theme.colors.white};
  padding: 0.5rem;
  font-family: ${({ theme }) => theme.font.family};

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

export const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.85rem;
  text-align: center;
`;