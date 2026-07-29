import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  padding: 2rem 1rem;
  text-align: center;
  background: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.85rem;
`;

export const Footer = () => (
  <StyledFooter>
    <p>
      ::: 2022 - © Todos los Derechos Reservados de TimeTravels.Corp :::
      <br />
      Encuentranos en Av. Granados Oe4-654 y General Sucre
    </p>
  </StyledFooter>
);

export default Footer;