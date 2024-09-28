import React from "react";
import styled, { css } from "styled-components";

const buttonStyles = css`
  align-self: stretch;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-weight: 600;
  font-family: Inter;
  font-size: 16px;
  cursor: pointer;

  ${({ $primary }) =>
    $primary &&
    css`
      background: #655de9;
      color: #eef2ff;
      border: none;

      &:hover {
        background: #544be7;
      }

      &:focus {
        background: #544be7;
        outline: #eef2ff solid 1px;
      }
    `}

  ${({ $secondary }) =>
    $secondary &&
    css`
      background: #dde1ff;
      color: #655de9;
      border: none;

      &:hover {
        background: #c6c6f9;
        color: #544be7;
      }
    `}

  ${({ $ternary }) =>
    $ternary &&
    css`
      background: #fef08a;
      color: #655de9;
      border: none;

      &:hover {
        background: #feec67;
        color: #544be7;
      }
    `}

  ${({ $primaryOutlined }) =>
    $primaryOutlined &&
    css`
      background: transparent;
      color: #655de9;
      border: 2px solid #655de9;

      &:hover {
        background: #eef2ff;
      }
    `}

  ${({ $secondaryOutlined }) =>
    $secondaryOutlined &&
    css`
      background: transparent;
      color: #dde1ff;
      border: 2px solid #dde1ff;

      &:hover {
        background: #dde1ff;
        color: #5b4cff;
      }
    `}

  ${({ $large }) =>
    $large &&
    css`
      height: 48px;
      padding: 12px 24px;
    `}

  ${({ $extraSmall }) =>
    $extraSmall &&
    css`
      height: 36px;
      padding: 8px 16px;
    `}
`;

const StyledButton = styled.button`
  ${buttonStyles}
`;

function Button({
  children,
  primary,
  secondary,
  ternary,
  primaryOutlined,
  large,
  extraSmall,
  secondaryOutlined,
  ...props
}) {
  return (
    <StyledButton
      $primary={primary}
      $secondary={secondary}
      $ternary={ternary}
      $large={large}
      $extraSmall={extraSmall}
      $primaryOutlined={primaryOutlined}
      $secondaryOutlined={secondaryOutlined}
      {...props}
    >
      {children}
    </StyledButton>
  );
}

export default Button;
