import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Categories, Pizza, PizzaSkeleton, Sort, sortList } from '../components/';
import { Pagination } from '../components/Pagination/Pagination';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import { setFilters } from '../redux/slices/filterSlice';

import '../scss/app.scss';
import { setItems } from '../redux/slices/pizzasSlice';
import { PizzaProps } from '../components/Pizza/Pizza.props';

const x = [...new Array(4)];

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const categoryId = useSelector((state: RootState) => state.filter.categoryId);
  const sortType = useSelector((state: RootState) => state.filter.sortType);
  const descSort = useSelector((state: RootState) => state.filter.descSort);
  const currentPage = useSelector((state: RootState) => state.filter.currentPage);
  const pizzas = useSelector((state: RootState) => state.pizza.items);
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const fetchPizzas = () => {
    setIsLoading(true);
    axios(
      `https://63247326bb2321cba92cbed5.mockapi.io/api/v1/pizzas?page=${currentPage}&limit=4&${
        categoryId ? `category=${categoryId}` : ''
      }&sortBy=${sortType.sortProperty}&order=${descSort ? 'desc' : 'asc'}`,
    )
      .then(({ data }) => {
        dispatch(setItems(data));
      })
      .catch((err) => console.warn(`Ошибка при получении списка пицц`, err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    //Если был первый рендер, то разрешаем вставлять параметры в URL
    if (isMounted.current) {
      //создаем строку и пушим ее в URL
      const queryString = qs.stringify({
        sortBy: sortType.sortProperty,
        categoryId,
        currentPage,
        descSort,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType.sortProperty, descSort, currentPage]);

  useEffect(() => {
    //Парсим URL и передаем значения в redux
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      console.log(params);
      const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);
      // params.sortBy = sort;
      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType.sortProperty, descSort, currentPage]);

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
          : pizzas.map((item: PizzaProps, i) => <Pizza key={i} {...item} />)}
      </div>
      <Pagination />
    </div>
  );
};

export default Home;
