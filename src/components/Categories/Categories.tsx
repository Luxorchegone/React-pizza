import React, { useState } from 'react';
import styles from './Categories.module.scss';
import { CategoriesProps } from './Categories.props';
import categories from '../../data/categoriesDb.json';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, setCategoryId } from '../../redux/slices/filterSlice';
import { RootState } from '../../redux/store';

export const Categories: React.FC<CategoriesProps> = () => {
  const dispatch = useDispatch();
  const { categoryId } = useSelector(selectFilter);

  return (
    <div className={styles.categories}>
      <ul>
        {categories.map((item, i) => {
          return (
            <li
              onClick={() => {
                dispatch(setCategoryId(i));
              }}
              className={i === categoryId ? styles.active : ''}
              key={i}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
