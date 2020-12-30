import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  hasError: boolean;
}
export const Container = styled.div<ContainerProps>`
  background: var(--input-background-color);
  border-radius: 10px;
  border: 2px solid var(--input-background-color);
  padding: 16px;
  width: 100%;
  color: var(--input-placeholder-color);

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1;
    border: 0;
    background: transparent;
    color: var(--input-text-color);
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    box-shadow: 0 0 0 30px var(--input-background-color) inset !important;
    -webkit-box-shadow: 0 0 0 30px var(--input-background-color) inset !important;
    -webkit-text-fill-color: var(--input-text-color) !important;
  }
  svg {
    margin-right: 16px;
  }

  ${props =>
    props.hasError &&
    css`
      border-color: var(--error-color);
    `}

  ${props =>
    props.isFocused &&
    css`
      color: var(--primary-color);
      border-color: var(--primary-color);
    `}

  ${props =>
    props.isFilled &&
    css`
      color: var(--primary-color);
    `}
`;

export const Error = styled(Tooltip)`
  height: 20px;

  svg {
    margin: 0 0 0 16px;
  }

  span {
    background: var(--error-color);
    color: #fff;

    &::before {
      border-color: var(--error-color) transparent;
    }
  }
`;
