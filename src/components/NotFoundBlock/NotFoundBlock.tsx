import React from 'react';
import styles from './NotFoundBlock.module.scss';
import NotFoindImg from './Shake.d8afa67b.png';

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <img src={NotFoindImg} alt={'Ничего не найдено!'} />
      <h1>Ничего не найдено</h1>
      <p>К сожалению данной страницы нет в нашем интернет магазине</p>
    </div>
  );
};

export default NotFoundBlock;
