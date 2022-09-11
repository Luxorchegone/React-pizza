import React from 'react';
import styles from './Pizza.module.scss';

interface PizzaProps {
  name: string,
  size: number[],
  type: number,
  imgUrl: string
}

const Pizza: React.FC<PizzaProps> = ({name, size, type, imgUrl}) => {
  return (
    <div className={styles.pizzaBlock}>
    <img className={styles.pizzaBlockImage}
      src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
      alt="Pizza" />
    <h4 className={styles.pizzaBlockTitle}>{name}</h4>
    <div className={styles.pizzaBlockSelector}>
      <ul>
        <li className="active">{type}</li>
        <li>традиционное</li>
      </ul>
      <ul>
        <li className="active">26 см.</li className="active">
        <li>30 см.</li>
        <li>40 см.</li>
      </ul>
    </div>
    <div className={styles.pizzaBlockBottom}>
      <div className="pizzaBlockPrice">от 395 ₽</div>

    </div>
  </div>

  )
}

export default Pizza