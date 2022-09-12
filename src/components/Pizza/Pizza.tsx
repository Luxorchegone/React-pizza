import React from 'react';
import styles from './Pizza.module.scss';
import { PizzaProps } from './Pizza.props';

const Pizza: React.FC<PizzaProps> = ({ name, size, type, imgUrl, price }) => {
  return (
    <div className={styles.pizzaBlock}>
      <img
        className={styles.pizzaBlockImage}
        src='https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg'
        alt='Pizza'
      />
      <h4 className={styles.pizzaBlockTitle}>{name}</h4>
      <div className={styles.pizzaBlockSelector}>
        <ul>
          <li className={styles.Active}>{type}</li>
          <li>традиционное</li>
        </ul>
        <ul>
          <li className={styles.Active}>26 см.</li>
          <li>30 см.</li>
          <li>40 см.</li>
        </ul>
      </div>
      <div className={styles.pizzaBlockBottom}>
        <div className='pizzaBlockPrice'>от {price} ₽</div>
      </div>
    </div>
  );
};

export default Pizza;
