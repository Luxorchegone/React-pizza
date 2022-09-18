import React from 'react';
import styles from './NotFoundBlock.module.scss';

type Props = {};

const NotFoundBlock = (props: Props) => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Ничего не найдено
      </h1>
      <p>К сожалению данной страницы нет в нашем интернет магазине</p>
    </div>
  );
};

export default NotFoundBlock;
