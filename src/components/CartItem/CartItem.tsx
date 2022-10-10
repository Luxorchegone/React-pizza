import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct, removeItems, removeOneItem } from '../../redux/slices/cartSlice';
import { Button } from '../Button/Button';
import styles from './CartItem.module.scss';
import { CartItemProps } from './CartItem.props';

export const CartItem: React.FC<CartItemProps> = ({
  id,
  imageUrl,
  name,
  type,
  size,
  price,
  count,
}) => {
  const dispatch = useDispatch();

  const onClickAdd = () => {
    dispatch(
      addProduct({
        id,
        type,
        size,
      }),
    );
  };

  const onClickRemoveOne = () => {
    dispatch(
      removeOneItem({
        id,
        type,
        size,
      }),
    );
  };

  const onClickRemoveAll = () => {
    dispatch(
      removeItems({
        id,
        type,
        size,
      }),
    );
  };

  return (
    <div className='cart__item'>
      <div className='cart__item-img'>
        <img className='pizza-block__image' src={imageUrl} alt='Пицца' />
      </div>
      <div className='cart__item-info'>
        <h3>{name}</h3>
        <p>
          {`${type} тесто`}, {size} см
        </p>
      </div>
      <div className='cart__item-count'>
        <Button buttonStyle='outline' form='circle' icon='minus' onClick={onClickRemoveOne} />
        <b>{count}</b>
        <Button buttonStyle='outline' form='circle' icon='plus' onClick={onClickAdd} />
      </div>
      <div className='cart__item-price'>
        <b>{price} ₽</b>
      </div>
      <Button buttonStyle='outline' form='circle' icon='remove' onClick={onClickRemoveAll} />
    </div>
  );
};
