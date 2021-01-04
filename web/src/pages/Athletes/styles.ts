import styled, { css } from 'styled-components';

interface RowProps {
  active: boolean;
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-width: 1024px;

  table {
    width: 80%;
  }

  form {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 10px;

    button {
      margin: 10px;
    }
  }
`;

export const AthletesTable = styled.table`
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

export const AthleteRow = styled.tr<RowProps>`
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

    a {
      margin-top: auto;
      height: 1.8rem;
      width: 64%;
      text-decoration: none;
      background-color: var(--primary-color);
      border-radius: 10px;
      padding 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--primary-text-color);
      font-weight: 500;
    }
  }

  ${(props) => !props.active && css`
    background-color: var(--secondary-color-hover);
    color: var(--secondary-text-color-inactive);
  `}
`;

export const ActiveCounter = styled.div`
  display: flex;
  width: 80%;
  max-width: 1024px;
  margin-top: 8px;

  p {
    background-color: var(--input-background-color);
    padding: 8px;
    border-radius: 10px;
    border: 2px solid var(--primary-color);
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      font-size: 1.4rem;
      padding: 0 8px;
    }
  }

  align-items: flex-end;
  justify-content: flex-end;
`
