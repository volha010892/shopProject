'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import MainPage from './MainPage';
import * as firebase from './redux/node_modules/firebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import history from './history';
import combinedReducer from './redux/reducers.js';

const firebaseCongig = {
  apiKey: 'AIzaSyAoXpI4H3LoFGWH_c9YTe-5Hvqr9WdMY9g',
  authDomain: 'ishop-57739.firebaseapp.com',
  databaseURL: 'https://ishop-57739.firebaseio.com',
  projectId: 'ishop-57739',
  storageBucket: 'ishop-57739.appspot.com',
  messagingSenderId: '568551176308',
  appId: '1:568551176308:web:fa09ee8fa7e960cac1b921',
};

firebase.initializeApp(firebaseCongig);
const store = createStore(combinedReducer, applyMiddleware(thunk));
ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <MainPage />
      </Router>
    </Provider>,
  document.getElementById('container'),
);
