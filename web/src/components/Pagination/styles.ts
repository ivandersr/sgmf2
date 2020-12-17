import styled, { css } from 'styled-components';

interface PageProps {
  active: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
`;

export const Page = styled.button<PageProps>`
  margin: 5px;
  padding: 10px 15px;
  color: var(--primary-text-color);
  border: 0;
  border-radius: 5px;
  background-color: var(--primary-color);
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--primary-color-hover);
  }

  ${props =>
    props.active &&
    css`
      background-color: var(--primary-color-active);
      color: var(--primary-text-color-active);
    `}
`;
