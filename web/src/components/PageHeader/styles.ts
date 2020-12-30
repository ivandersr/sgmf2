import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  max-width: 1024px;
`;

export const HeaderTitle = styled.div`
  font-size: 20px;
  color: var(--header-text-color);
  display: flex;
  flex: 2;
  flex-direction: row;
  width: 64%;
  margin: 32px 0;
  max-width: 1024px;
  min-width: 640px;

  align-items: center;
  justify-content: flex-start;

  img {
    height: 48px;
    margin-right: 24px;
  }

  h1 {
    text-align: center;
  }
`;

export const UserMenu = styled.div`
  font-size: 12px;
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: flex-end;
  justify-content: center;

  h2 {
    color: var(--primary-color);
  }

  button {
    width: 140px;
    height: 30%;
    background-color: var(--button-logout-color);
    color: var(--header-text-color);
    margin-top: 8px;

    &:hover {
      background-color: var(--button-logout-color-hover);
    }
  }
`;

export const NavMenu = styled.div`
  display: flex;
  width: 100%;
  margin: 16px;
  justify-content: space-around;

  a {
    margin: 0 16px;
    text-decoration: none;
    color: var(--menu-text-color);
    background-color: var(--menu-color);
    padding: 10px;

    border-radius: 10px;

    transition: background-color 0.2s;

    &:hover {
      background-color: var(--menu-color-hover);
    }
  }
`;
