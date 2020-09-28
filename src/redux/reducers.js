import { combineReducers } from 'redux';

import itemsReducer from './items';
import filtersReducer from './filters';
import cart from './cart';

let combinedReducer = combineReducers({
  items: itemsReducer,
  filters: filtersReducer,
  cart,
});

export default combinedReducer;
