import React from 'react';
import { useDispatch } from 'react-redux';
import { addProduct, CartItem, removeItems, removeOneItem } from '../../redux/slices/cartSlice';
import { Button } from '../Button/Button';
import styles from './CartPizzaItem.module.scss';
import { CartPizzaItemProps } from './CartPizzaItem.props';

export const CartPizzaItem: React.FC<CartPizzaItemProps> = ({
  id,
  imageUrl,
  name,
  type,
  size,
  price,
  count,
}) => {
  const dispatch = useDispatch();

  const item: CartItem = {
    id,
    imageUrl,
    name,
    type,
    size,
    price,
    count,
  };

  const onClickAdd = () => {
    dispatch(addProduct(item));
  };

  const onClickRemoveOne = () => {
    dispatch(removeOneItem(item));
  };

  const onClickRemoveAll = () => {
    dispatch(removeItems(item));
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
