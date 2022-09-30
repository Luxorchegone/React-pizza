import React from 'react';
import styles from './Pagination.module.scss';
import { PaginationProps } from './Pagination.props';
import ReactPaginate from 'react-paginate';

export const Pagination = (): JSX.Element => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel='...'
      nextLabel='>'
      onPageChange={(e) => console.log(e)}
      pageRangeDisplayed={8}
      pageCount={3}
      previousLabel='<'
    />
  );
};
