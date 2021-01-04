import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1024px;
`;

export const Details = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 48px;
  justify-content: center;

  h3 {
    margin: 16px 0;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
      width: 320px;
    }


    button {
      width: 200px;
    }
  }
`;

export const Menu = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  margin: 16px 48px;
  justify-content: center;


  a {
    text-decoration: none;
    background-color: var(--tertiary-color);
    color: var(--athlete-menu-color);
    padding: 10px;
    border: 1px solid var(--primary-color);
    border-radius: 10px;
    margin: 8px 0;
    width: 200px;
    text-align: center;

    transition: color 0.2s;

    &:hover {
      color: var(--athlete-menu-color-hover);
    }
  }
`;

