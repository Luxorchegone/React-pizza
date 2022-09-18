import React, { useState, useEffect } from 'react';
import { Categories, Header, Pizza, PizzaSkeleton, Sort } from '../components';
import '../scss/app.scss';

const x = [...new Array(6)];
console.log(x);

const Home = () => {
  const [pizzas, setPizzas] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://63247326bb2321cba92cbed5.mockapi.io/api/v1/pizzas')
      .then((res) => res.json())
      .then((data) => {
        setPizzas(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isLoading
          ? x.map((_, i) => <PizzaSkeleton key={i} />)
          : pizzas.map((item, i) => (
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
    </>
  );
};

export default Home;
