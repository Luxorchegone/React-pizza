import React, { useEffect, useState } from 'react';
import { Button } from '../Button/Button';
import styles from './Pizza.module.scss';
import { PizzaProps } from './Pizza.props';
import typeNames from '../../data/pizzaTypesNameDb.json';

import { useDispatch, useSelector } from 'react-redux';
import { addProduct, selectCartItemByParam } from '../../redux/slices/cartSlice';
import { RootState } from '../../redux/store';

export const Pizza: React.FC<PizzaProps> = ({ id, name, sizes, types, imageUrl, price }) => {
  const [activeSize, setActiveSize] = useState<number>(0);
  const [activeType, setActiveType] = useState<number>(0);
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemByParam(id, typeNames[activeType], sizes[activeSize]));

  const addedPizzaCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item = {
      id,
      name,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
    };

    dispatch(addProduct(item));
  };

  return (
    <div className={styles.pizzaBlock}>
      <img
        className={styles.pizzaBlockImage}
        src={imageUrl}
        alt='Pizza'
        width={'260px'}
        height={'260px'}
      />
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
                {`${item} см`}
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.pizzaBlockBottom}>
        <div className={styles.pizzaBlockPrice}>от {price} ₽</div>
        <Button
          onClick={onClickAdd}
          buttonStyle='outline'
          text='Добавить'
          appearance='add'
          icon='plus'
          count={addedPizzaCount}
        />
      </div>
    </div>
  );
};