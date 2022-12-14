import React from 'react';
import styles from './EmptyCart.module.scss';
import Image from '../../assets/img/empty-cart.png';

export const EmptyCart: React.FC = () => {
  return (
    <div className='container container--cart'>
      <div className='cart cart--empty'>
        <h2>Корзина пустая 😕</h2>
        <p>
          Вероятней всего, вы не заказывали ещё пиццу.
          <br />
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <img src={Image} alt='Пустая корзина' />
        <a href='/' className='button button--black'>
          <span>Вернуться назад</span>
        </a>
      </div>
    </div>
  );
};
