import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  hasError: boolean;
}
export const Container = styled.div<ContainerProps>`
  background: var(--input-background-color);
  border-radius: 10px;
  border: 2px solid var(--input-background-color);
  padding: 0;
  width: 100%;
  color: var(--input-placeholder-color);

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.hasError &&
    css`
      border-color: var(--error-color);
    `}
`;

export const Error = styled(Tooltip)`
  height: 20px;

  svg {
    margin: 0 16px 0 16px;
  }

  span {
    background: var(--error-color);
    color: #fff;

    &::before {
      border-color: var(--error-color) transparent;
    }
  }
`;
