import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Categories, Pizza, PizzaSkeleton, Sort } from '../components/';
import { Pagination } from '../components/Pagination/Pagination';
import { filterSlice } from '../redux/slices/filterSlice';
import { RootState } from '../redux/store';
import '../scss/app.scss';

const x = [...new Array(4)];

const Home = () => {
  const [pizzas, setPizzas] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortType, setSortType] = useState({ name: 'по популярности', sortProperty: 'rating' });
  const [descSort, setDescSort] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const categoryId = useSelector((state: RootState) => state.filter.categoryId);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://63247326bb2321cba92cbed5.mockapi.io/api/v1/pizzas?page=${currentPage}&limit=4&${
        categoryId ? `category=${categoryId}` : ''
      }&sortBy=${sortType.sortProperty}&order=${descSort ? 'desc' : 'asc'}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setPizzas(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, descSort, currentPage]);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories />
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
      <Pagination setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Home;
