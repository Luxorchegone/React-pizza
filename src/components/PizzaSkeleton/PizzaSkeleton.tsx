import React from 'react';
import ContentLoader from 'react-content-loader';

export const PizzaSkeleton: React.FC = () => (
  <ContentLoader
    speed={1}
    width={280}
    height={465}
    viewBox='0 0 280 465'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'>
    <rect x='0' y='268' rx='10' ry='10' width='280' height='22' />
    <circle cx='135' cy='125' r='125' />
    <rect x='149' y='421' rx='23' ry='23' width='131' height='44' />
    <rect x='0' y='428' rx='10' ry='10' width='92' height='27' />
    <rect x='0' y='313' rx='10' ry='10' width='280' height='88' />
  </ContentLoader>
);
