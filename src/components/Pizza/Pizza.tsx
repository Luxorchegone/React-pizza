import React, { useState } from 'react';
import { Button } from '../Button/Button';
import styles from './Pizza.module.scss';
import { PizzaProps } from './Pizza.props';
import typeNames from '../../data/pizzaTypesNameDb.json';

export const Pizza: React.FC<PizzaProps> = ({ name, sizes, types, imgUrl, price }) => {
  const [activeSize, setActiveSize] = useState(0);
  const [activeType, setActiveType] = useState(0);

  return (
    <div className={styles.pizzaBlock}>
      <img className={styles.pizzaBlockImage} src={imgUrl} alt='Pizza' />
      <h4 className={styles.pizzaBlockTitle}>{name}</h4>
      <div className={styles.pizzaBlockSelector}>
        <ul>
          {types.map((item, i) => {
            return (
              <li
                onClick={() => {
                  setActiveType(i);
                }}
                key={i}
                className={i === activeType ? styles.active : ''}>
                {typeNames[item]}
              </li>
            );
          })}
        </ul>
        <ul>
          {sizes.map((item, i) => {
            return (
              <li
                onClick={() => {
                  setActiveSize(i);
                }}
                key={i}
                className={i === activeSize ? styles.active : ''}>
                {`${item} см.`}
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.pizzaBlockBottom}>
        <div className={styles.pizzaBlockPrice}>от {price} ₽</div>
        <Button buttonStyle='outline' text='Добавить' appearance='add' count={0} />
      </div>
    </div>
  );
};
