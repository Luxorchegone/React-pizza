import React, { useState, useEffect } from 'react';
import { Categories, Header, Pizza, PizzaSkeleton, Sort } from './components';
import Home from './pages/Home';
import './scss/app.scss';

const x = [...new Array(6)];
console.log(x);

const App = () => {
  return (
    <div className='wrapper'>
      <Header count={10} summary={300} />
      <div className='content'>
        <div className='container'>
          <Home />
        </div>
      </div>
    </div>
  );
};

export default App;
