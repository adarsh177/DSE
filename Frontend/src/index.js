import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CompanyScreen from './screens/CompanyScreen';
import StocksScreen from './screens/StocksScreen';

ReactDOM.render(
  <React.StrictMode>
    <StocksScreen />
  </React.StrictMode>,
  document.getElementById('root')
);