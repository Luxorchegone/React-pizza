import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<{
    imageUrl: string;
    name: string;
    price: string;
  }>();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios(
          `https://63247326bb2321cba92cbed5.mockapi.io/api/v1/pizzas/${id}`,
        );
        setData(data);
      } catch (e) {
        console.warn(`Ошибка при получении пиццы`, e);
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  return (
    <div className='fullPiza'>
      <h2>На данный момент эта страница реализована не полностью, но мы работаем над этим))</h2>
      {data ? (
        <>
          <h3>{data.name}</h3>
          <img src={data.imageUrl} alt={'Pizza'} />
          <h3>{data.price}</h3>
        </>
      ) : (
        <h1>Загрузка...</h1>
      )}
    </div>
  );
};

export default FullPizza;
