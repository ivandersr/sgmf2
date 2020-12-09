import styled from 'styled-components';

export const Content = styled.div`
  background: var(--background-color);
  opacity: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h1 {
    margin-bottom: 16px;
    width: 97%;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    background: var(--secondary-color);
    opacity: 80%;
  }

  a {
    text-decoration: none;
    font-size: 20px;
    width: 60%;
    display: flex;
    justify-content: center;
    margin: 8px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    background: var(--primary-color);
    color: var(--text-primary-color);

    &:hover {
      background-color: var(--primary-color-hover);
    }
  }
`;
