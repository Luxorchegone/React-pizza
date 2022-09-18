import React, { useState, useEffect } from 'react';
import Header from './Header/Header';
import Pizza from './Pizza/Pizza';
import Sort from './Sort/Sort';
import Categories from './Categories/Categories';
import pizzas from '../data/pizzaDb.json';
import './scss/app.scss';
import PizzaSkeleton from './PizzaSkeleton/PizzaSkeleton';

const x = [...new Array(6)];
console.log(x);

export const All = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://63247326bb2321cba92cbed5.mockapi.io/api/v1/pizzas')
      .then((res) => res.json())
      .then((data) => setPizzas(data));
  }, []);

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
            { pizzas.length ===0 ? 
              x.map((_,i)=> <PizzaSkeleton key={i}/>) : 
            
            pizzas.map((item, i) => (
              <Pizza
                key={i}
                name={item.name}
                price={item.price}
                imgUrl={item.imageUrl}
                sizes={item.sizes}
                types={item.types}
              />))}
          </div>
        </div>
      </div>
    </div>
  );
};
