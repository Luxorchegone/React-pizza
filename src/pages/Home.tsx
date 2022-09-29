import React, { useState, useEffect } from 'react';
import { Categories, Pizza, PizzaSkeleton, Sort } from '../components/';
import '../scss/app.scss';

const x = [...new Array(6)];
console.log(x);

const Home = () => {
  const [pizzas, setPizzas] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({ name: 'по популярности', sortProperty: 'rating' });
  const [descSort, setDescSort] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://63247326bb2321cba92cbed5.mockapi.io/api/v1/pizzas?${
        categoryId ? `category=${categoryId}` : ''
      }&sortBy=${sortType.sortProperty}&order=${descSort ? 'desc' : 'asc'}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setPizzas(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, descSort]);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories categoryId={categoryId} setCategoryId={setCategoryId} />
        <Sort
          sortType={sortType}
          setSortType={setSortType}
          descSort={descSort}
          setDescSort={setDescSort}
        />
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
    </div>
  );
};

export default Home;
