﻿import React from 'react';
import { Header } from './components';
import { Cart, Home, Order, ThanksForOrder } from './pages';
import './MainPage.css';
import { Route, Switch} from 'react-router-dom';

function MainPage() {
 
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/cart" component={Cart} exact />
        <Route path="/order" component={Order} exact />
        <Route path="/thanks" component={ThanksForOrder} exact />
      </Switch>
      </div>
    </div>
  );
}
export default MainPage;
