import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Categories, Pizza, PizzaSkeleton, Sort } from '../components/';
import { Pagination } from '../components/Pagination/Pagination';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import '../scss/app.scss';

const x = [...new Array(4)];

const Home = () => {
  const navigate = useNavigate();
  const [pizzas, setPizzas] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const categoryId = useSelector((state: RootState) => state.filter.categoryId);
  const sortType = useSelector((state: RootState) => state.filter.sortType);
  const descSort = useSelector((state: RootState) => state.filter.descSort);
  const currentPage = useSelector((state: RootState) => state.pagination.pageNumber);

  useEffect(() => {
    setIsLoading(true);
    axios(
      `https://63247326bb2321cba92cbed5.mockapi.io/api/v1/pizzas?page=${currentPage}&limit=4&${
        categoryId ? `category=${categoryId}` : ''
      }&sortBy=${sortType.sortProperty}&order=${descSort ? 'desc' : 'asc'}`,
    ).then(({ data }) => {
      setPizzas(data);
      setIsLoading(false);
    });
    window.scrollTo(0, 0);
    const queryString = qs.stringify({
      sortBy: sortType.sortProperty,
      category: categoryId,
      page: currentPage,
      descSort,
    });
    navigate(`?${queryString}`);
  }, [categoryId, sortType.sortProperty, descSort, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      console.log(params);
    }
  }, []);

  return (
    <div className='container'>
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
      <Pagination />
    </div>
  );
};

export default Home;
