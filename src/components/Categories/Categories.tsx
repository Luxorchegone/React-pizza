import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';
import { CategoriesProps } from './Categories.props';

const Categories = ({}) => {
  return (
    <div className={styles.categories}>
      <ul>
        <li className={styles.active}>Все</li>
        <li>Мясные</li>
        <li>Вегетарианская</li>
        <li>Гриль</li>
        <li>Острые</li>
        <li>Закрытые</li>
      </ul>
    </div>
  );
};

export default Categories;
