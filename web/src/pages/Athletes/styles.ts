import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  button {
    width: 80%;
  }

  table {
    width: 80%;
  }
`;

export const AthletesTable = styled.table`
  border: 1px solid var(--background-color);

  color: var(--primary-text-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vh;

  thead {
    display: flex;
    border-radius: 10px 10px 0 0;
    width: 100%;
    background-color: var(--primary-color);
    th {
      width: 25%;
      padding: 10px;
    }
  }

  tbody {
    width: 100%;
    display: flex;
    border-radius: 0 0 10px 10px;
    background-color: var(--secondary-color);
    color: var(--secondary-text-color);
  }
`;

export const AthleteRow = styled.tr`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 3rem;

  transition: background-color 0.2s;

  &:hover {
    background-color: var(--secondary-color-hover);
  }

  td {
    display: flex;
    width: 25%;
    justify-content: center;
    align-items: flex-start;

    button {
      margin-top: auto;
      height: 1.8rem;
      width: 64%;
    }
  }
`;