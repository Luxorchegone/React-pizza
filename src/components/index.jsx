import React from 'react';
import Header from './Header/Header';
import Pizza from './Pizza/Pizza';
import Sort from './Sort/Sort';
import Categories from './Categories/Categories';
import pizzas from '../data/pizzaDb.json';
import './scss/app.scss';

export const All = () => {
  return (
    <div className='wrapper'>
      <Header count={10} summary={300} />
      <div className='content'>
        <div className='container'>
          <div className='content__top'>
            <Categories />
            <Sort />
          </div>
          <h2 className='content__title'>Все пиццы</h2>
          <div className='content__items'>
            {pizzas.map((item, i) => (
              <Pizza
                key={i}
                name={item.name}
                price={item.price}
                imgUrl={item.imageUrl}
                sizes={item.sizes}
                types={item.types}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
