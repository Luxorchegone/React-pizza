import React from 'react';
import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/filterSlice';
import { RootState } from '../../redux/store';

export const Pagination: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state: RootState) => state.filter.currentPage);
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel='...'
      nextLabel='>'
      onPageChange={(e) => dispatch(setCurrentPage(e.selected + 1))}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      previousLabel='<'
    />
  );
};
