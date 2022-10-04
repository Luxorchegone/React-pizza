import React from 'react';
import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { setPage } from '../../redux/slices/paginationSlice';

export const Pagination: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel='...'
      nextLabel='>'
      onPageChange={(e) => dispatch(setPage(e.selected + 1))}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel='<'
    />
  );
};
