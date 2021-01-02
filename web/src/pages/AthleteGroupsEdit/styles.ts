import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Content = styled.div`
display: flex;
width: 100%;
max-width: 1024px;
flex-direction: column;
align-items: center;
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
    width: 400px;
  }

  button {
    width: 200px;
  }
}
`;
