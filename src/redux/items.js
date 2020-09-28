import { ITEMS_LOADING, ITEMS_ERROR, ITEMS_SET } from '../AC/itemsAC';

const initState = {
  status: 0, // 0 - ничего не началось, 1 - идёт загрузка, 2 - была ошибка, 3 - данные загружены
  data: null,
};

function itemsReducer(state = initState, action) {
  switch (action.type) {
    case ITEMS_LOADING: {
      let newState = {
        status: 1,
        data: null,
      };
      return newState;
    }
    case ITEMS_ERROR: {
      let newState = {
        status: 2,
        data: null,
      };
      return newState;
    }
    case ITEMS_SET: {
      let newState = {
        status: 3,
        data: action.items,
      };
      return newState;
    }

    default:
      return state;
  }
}
export default itemsReducer;
