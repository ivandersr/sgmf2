import React from 'react';
import './styles.css';

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
    <div className="pagination-container">
      {paginationItems.map(item => (
        <button
          type="button"
          className={`pagination-item
            ${activePage === item ? 'active' : 'inactive'}`}
          onClick={() => goToPage(item)}
        >
          {item + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
