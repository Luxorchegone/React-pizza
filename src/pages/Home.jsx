import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Categories, Pizza, PizzaSkeleton, Sort, sortList } from '../components';
import { Pagination } from '../components/Pagination/Pagination';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import { setFilters } from '../redux/slices/filterSlice';

import '../scss/app.scss';
import { fetchPizzas } from '../redux/slices/pizzasSlice';
import { PizzaProps } from '../components/Pizza/Pizza.props';

const x = [...new Array(4)];

const Home = () => {
  const navigate = useNavigate();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sortType);
  const descSort = useSelector((state) => state.filter.descSort);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const { status, items } = useSelector((state) => state.pizza);
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

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
    if (!isSearch.current) {
      dispatch(
        fetchPizzas({ currentPage, categoryId, descSort, sortProperty: sortType.sortProperty }),
      );
    }
    window.scrollTo(0, 0);
  }, [categoryId, sortType.sortProperty, descSort, currentPage]);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {status === 'error' ? (
          //TODO стилизация!
          <>
            <h2>Не удалось получить список пицц </h2>
            <p>Попробуйте перезагрузить страницу</p>
          </>
        ) : (
          <>
            {status === 'loading'
              ? x.map((_, i) => <PizzaSkeleton key={i} />)
              : items.map((item, i) => <Pizza key={i} {...item} />)}
          </>
        )}
      </div>
      <Pagination />
    </div>
  );
};

export default Home;
