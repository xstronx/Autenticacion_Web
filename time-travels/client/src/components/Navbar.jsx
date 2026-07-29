import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background: ${({ theme }) => theme.colors.dark};
  position: relative;
`;

const LogoWrap = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 100px;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.5rem;
`;

const Check = styled.input.attrs({ type: "checkbox" })`
  display: none;
`;

const BarBtn = styled.label`
  font-size: 25px;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  display: block;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: none;
  }
`;

const NavMenu = styled.ul`
  position: fixed;
  width: 100%;
  height: 0;
  top: 100px;
  left: 0;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.9);
  text-align: center;
  transition: all 0.5s;

  ${Check}:checked ~ & {
    height: calc(100vh - 100px);
  }

  li {
    line-height: 30px;
    margin: 30px 0;
  }

  a {
    color: ${({ theme }) => theme.colors.white};
    font-size: 16px;
    text-transform: uppercase;
    font-weight: 600;

    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    position: static;
    height: auto;
    width: auto;
    overflow: visible;
    background: none;
    display: flex;
    gap: 20px;

    li {
      margin: 0;
      line-height: normal;
    }

    a {
      font-size: 14px;
    }
  }
`;

export const Navbar = ({ links = [], logo = "/imagenes/vtd2.png" }) => (
  <Nav>
    <LogoWrap>
      <Logo src={logo} alt="VTD" />
    </LogoWrap>
    <Title>TIME TRAVELS</Title>
    <Check id="check" />
    <BarBtn htmlFor="check">
      <i className="fas fa-bars"></i>
    </BarBtn>
    <NavMenu>
      {links.map((link) => (
        <li key={link.to}>
          <Link to={link.to}>{link.label}</Link>
        </li>
      ))}
    </NavMenu>
  </Nav>
);

export default Navbar;