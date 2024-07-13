// import React from "react";
// import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const StyledButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-weight: 600;
  font-family: Inter;
  font-size: 16px;
  cursor: pointer;

  /* Color variants */
  ${({ primary }) =>
    primary &&
    css`
      background: #fdff85;
      color: #081026;
      border: none;

      &:hover {
        background: #fbff4d;
      }
    `}

  ${({ secondary }) =>
    secondary &&
    css`
      background: #dde1ff;
      color: #5b4cff;
      border: none;

      &:hover {
        background: #c6c6f9;
      }
    `} 
    
    /* Size variants */
    ${({ larg }) =>
    larg &&
    css`
      height: 48px;
      padding: 12px 24px;
    `}

        ${({ extraSmall }) =>
    extraSmall &&
    css`
      height: 36px;
      padding: 8px 16px;
    `}
`;

// eslint-disable-next-line react/prop-types
function Button({ children, primary, secondary, larg, extraSmall }) {
  return (
    <StyledButton
      primary={primary}
      secondary={secondary}
      larg={larg}
      extraSmall={extraSmall}
    >
      {children}
    </StyledButton>
  );
}

export default Button;
