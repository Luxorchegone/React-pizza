import React, { useState, useEffect } from 'react';
import { Header } from './components/';
import Home from './pages/Home';
import Cart from './pages/Cart';
import { Routes, Route } from 'react-router-dom';
import './scss/app.scss';
import NotFound from './pages/NotFound';

const x = [...new Array(6)];
console.log(x);

const App = () => {
  return (
    <div className='wrapper'>
      <Header count={10} summary={300} />
      <div className='content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
