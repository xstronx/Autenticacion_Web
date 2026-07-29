import styled from "styled-components";
import fondoImg from "../fondo.jpg";

export const HeroBanner = styled.div`
  width: 100%;
  min-height: 100vh;
  background-image: url(${fondoImg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

export const BannerText = styled.div`
  padding: 0 30px;
  padding-top: 150px;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};

  h1 {
    font-size: 50px;
    margin-bottom: 30px;
  }

  h2 {
    font-size: 16px;
    font-weight: 600;
  }

  span {
    color: ${({ theme }) => theme.colors.accent};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    h1 {
      font-size: 70px;
    }

    h2 {
      font-size: 20px;
    }
  }
`;

export default HeroBanner;