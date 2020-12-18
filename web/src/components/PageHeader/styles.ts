import styled from 'styled-components';

export const Container = styled.div`
  font-size: 20px;
  color: var(--header-text-color);
  display: flex;
  flex-direction: row;
  width: 64%;
  margin: 32px 0;
  max-width: 1024px;

  align-items: center;
  justify-content: center;

  img {
    height: 48px;
    margin-right: 24px;
  }

  h1 {
    text-align: center;
  }
`;
