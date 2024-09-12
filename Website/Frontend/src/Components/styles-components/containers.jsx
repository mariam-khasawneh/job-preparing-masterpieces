import styled, { css } from "styled-components";

export const Section = styled.div`
  display: flex;
  padding: 64px 96px;
  font-family: Inter;
  height: calc(100vbh - 69px);

  @media screen and (min-width: 1024px) {
    padding: 64px 96px;
  }
  /* Media query for screens smaller than 768px */
  @media (min-width: 768px) and (max-width: 1023px) {
    padding: 48px;
  }

  /* Media query for screens smaller than 480px */
  @media (max-width: 767px) {
    padding: 32px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  padding: 64px;
  /* border-radius: 16px; */

  @media screen and (min-width: 1024px) {
    padding: 64px 96px;
  }
  /* Media query for screens smaller than 768px */
  @media (min-width: 768px) and (max-width: 1023px) {
    padding: 48px;
  }

  /* Media query for screens smaller than 480px */
  @media (max-width: 767px) {
    padding: 32px;
  }
  /* colors */
  ${({ dark }) =>
    dark &&
    css`
      background: #081026;
      color: #dde1ff;
    `}
  ${({ light }) =>
    light &&
    css`
      background: #5b4cff;
    `}
`;
