import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSort, selectFilter, setOrder, SortType } from '../../redux/slices/filterSlice';
import { SortProps } from './Sort.props';
import styles from './Sort.module.scss';

type SortItem = {
  name: string;
  sortProperty: string;
};

export const sortList: SortType[] = [
  { name: 'по популярности', sortProperty: 'rating' },
  { name: 'по цене', sortProperty: 'price' },
  { name: 'по алфавиту', sortProperty: 'name' },
];

export const Sort: React.FC<SortProps> = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { sortType, order } = useSelector(selectFilter);
  const dispatch = useDispatch();
  const sortRef = useRef<HTMLDivElement>(null);

  const onClickListItem = (item: SortType) => {
    dispatch(setSort(item));
    setIsVisible(false);
  };

  const onClick = (event: MouseEvent) => {
    if (sortRef.current) {
      if (!event.composedPath().includes(sortRef.current)) {
        setIsVisible(false);
      }
    }
  };

  useEffect(() => {
    document.body.addEventListener('click', onClick, true);
    return () => {
      document.body.removeEventListener('click', onClick, true);
    };
  }, []);

  return (
    <div ref={sortRef} className={styles.sort}>
      <div className={styles.sortLabel}>
        <div
          onClick={() => {
            dispatch(setOrder(order === 'asc' ? 'desc' : 'asc'));
          }}>
          <svg
            className={order === 'desc' ? styles.turned : ''}
            width='10'
            height='6'
            viewBox='0 0 10 6'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
              fill='#2C2C2C'
            />
          </svg>
          <b>Сортировка:</b>
        </div>
        <span onClick={() => setIsVisible(!isVisible)}>{sortType.name}</span>
      </div>
      {isVisible && (
        <div className={styles.sortPopup}>
          <ul>
            {sortList.map((item, i) => {
              return (
                <li
                  onClick={() => {
                    onClickListItem(item);
                  }}
                  className={sortType.sortProperty === item.sortProperty ? styles.active : ''}
                  key={i}>
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
