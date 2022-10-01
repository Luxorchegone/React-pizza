import React from 'react';
import styles from './Pagination.module.scss';
import { PaginationProps } from './Pagination.props';
import ReactPaginate from 'react-paginate';

export const Pagination: React.FC<PaginationProps> = ({ setCurrentPage }): JSX.Element => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel='...'
      nextLabel='>'
      onPageChange={(e) => setCurrentPage(e.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel='<'
    />
  );
};
