import styled from 'styled-components';

export const Container = styled.button`
  background: var(--primary-color);
  height: 56px;
  padding: 0 16px;
  color: var(--primary-text-color);
  border: 0;
  border-radius: 10px;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: var(--primary-color-hover);
  }
`;
