/* eslint-disable react-refresh/only-export-components */
import styled from "styled-components";

export const Display = styled.h1`
  @media screen and (min-width: 1024px) {
    font-size: 4.5rem;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 3.5rem;
  }

  @media screen and (max-width: 767px) {
    font-size: 2.5rem;
  }
`;

export const H1 = styled.h1`
  @media screen and (min-width: 1024px) {
    font-size: 3.75rem;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 3rem;
  }

  @media screen and (max-width: 767px) {
    font-size: 2.25rem;
  }
`;

export const H2 = styled.h2`
  @media screen and (min-width: 1024px) {
    font-size: 3rem;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 2.5rem;
  }

  @media screen and (max-width: 767px) {
    font-size: 2rem;
  }
`;

export const H3 = styled.h3`
  @media screen and (min-width: 1024px) {
    font-size: 2.25rem;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 2rem;
  }

  @media screen and (max-width: 767px) {
    font-size: 1.75rem;
  }
`;

export const H4 = styled.h4`
  @media screen and (min-width: 1024px) {
    font-size: 2rem;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 1.75rem;
  }

  @media screen and (max-width: 767px) {
    font-size: 1.5rem;
  }
`;

export const H5 = styled.h5`
  @media screen and (min-width: 1024px) {
    font-size: 1.5rem;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 1.5rem;
  }

  @media screen and (max-width: 767px) {
    font-size: 1.25rem;
  }
`;

export const H6 = styled.h6`
  @media screen and (min-width: 1024px) {
    font-size: 1.25rem;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 1.125rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 1.125rem;
  }
`;

export const Body = styled.p`
  font-size: 1.125rem;
`;

export const Caption = styled.p`
  font-size: 0.75rem;
`;
