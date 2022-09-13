import React, { useState } from 'react';
import styles from './Categories.module.scss';
import { CategoriesProps } from './Categories.props';
import categories from '../../data/categoriesDb.json';

const Categories: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className={styles.categories}>
      <ul>
        {categories.map((item, i) => {
          return (
            <li
              onClick={() => {
                setActiveIndex(i);
              }}
              className={i === activeIndex ? styles.active : ''}
              key={i}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
