import React from 'react';
import { Container, Page } from './styles';

interface IProps {
  totalPages?: number;
  activePage?: number;
  goToPage(item: number): void;
}

const Pagination: React.FC<IProps> = ({
  totalPages = 0,
  goToPage,
  activePage,
}) => {
  const paginationItems = Array.from(Array(totalPages).keys());
  return (
    <Container>
      {paginationItems.map(item => (
        <Page
          key={item}
          type="button"
          active={activePage === item}
          onClick={() => goToPage(item)}
        >
          {item + 1}
        </Page>
      ))}
    </Container>
  );
};

export default Pagination;
