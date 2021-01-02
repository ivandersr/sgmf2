import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-width: 1024px;

  table {
    width: 80%;
  }
`;

export const AthleteGroupsTable = styled.table`
  border: 1px solid var(--background-color);

  color: var(--primary-text-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1024px;

  thead {
    display: flex;
    border-radius: 10px 10px 0 0;
    width: 100%;
    background-color: var(--primary-color);
    tr {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      th {
        padding: 10px;
        width: 100vw;
      }
    }
  }

  tbody {
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 0 0 10px 10px;
    background-color: var(--secondary-color);
    color: var(--secondary-text-color);
  }
`;

export const AthleteGroupRow = styled.tr`
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
    width: 33.3%;
    justify-content: center;
    align-items: flex-start;

    a {
      display: flex;
      text-decoration: none;
      background-color: var(--primary-color);
      color: var(--primary-text-color);
      font-weight: 500;
      border-radius: 10px;
      padding: 5px 20px;
      margin-top: auto;
      height: 1.8rem;
      width: 50%;
      justify-content: center;
    }
  }
`;
