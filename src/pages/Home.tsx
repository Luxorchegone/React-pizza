import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Categories, Pizza, PizzaSkeleton, Sort, sortList } from '../components';
import { Pagination } from '../components/Pagination/Pagination';
import { useAppDispatch } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import { selectFilter, setFilters } from '../redux/slices/filterSlice';

import '../scss/app.scss';
import { fetchPizzas, SearchPizzaParams, selectPizza } from '../redux/slices/pizzasSlice';

const x = [...new Array(4)];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { sortType, order, categoryId, currentPage, searchText } = useSelector(selectFilter);
  const { status, items } = useSelector(selectPizza);
  const dispatch = useAppDispatch();
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
        order,
        search: searchText,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType.sortProperty, order, currentPage]);

  useEffect(() => {
    //Парсим URL и передаем значения в redux
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
      const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

      // if (sort) {
      //   params.
      // }

      dispatch(
        setFilters({
          categoryId: Number(params.categoryId),
          currentPage: Number(params.currentPage),
          order: params.order,
          searchText: params.search,
          sortType: sort ?? sortList[0],
        }),
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      dispatch(
        fetchPizzas({
          currentPage: String(currentPage),
          categoryId: String(categoryId),
          order,
          search: searchText,
          sortBy: sortType.sortProperty,
        }),
      );
    }
    window.scrollTo(0, 0);
  }, [categoryId, sortType.sortProperty, order, currentPage]);

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
