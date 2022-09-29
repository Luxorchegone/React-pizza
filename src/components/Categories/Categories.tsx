import React, { useState } from 'react';
import styles from './Categories.module.scss';
import { CategoriesProps } from './Categories.props';
import categories from '../../data/categoriesDb.json';

export const Categories: React.FC<CategoriesProps> = ({ categoryId, setCategoryId }) => {
  return (
    <div className={styles.categories}>
      <ul>
        {categories.map((item, i) => {
          return (
            <li
              onClick={() => {
                setCategoryId(i);
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
