const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};
const totalPriceItems = (arr) => arr.reduce((sum, item) => item.price + sum, 0);
const cart = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM_CART': {
      const itemCurrent = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].items, action.payload];
      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: itemCurrent,
          totalPrice: totalPriceItems(itemCurrent),
        },
      };
      const getItems = Object.values(newItems).map((obj) => obj.items);
      const concatItems = [].concat.apply([], getItems);
      const totalPrice = totalPriceItems(concatItems);
      return {
        ...state,
        items: newItems,
        totalCount: concatItems.length,
        totalPrice,
      };
    }
    case 'CLEAR_CART':
      return {
        totalPrice: 0,
        totalCount: 0,
        items: {},
      };
    case 'DELETE_ITEM_FROM_CART':
      const newItems = {
        ...state.items,
      };
      const currentTotalPrice = newItems[action.payload].totalPrice;
      const currentTotalCount = newItems[action.payload].items.length;

      delete newItems[action.payload];
      return {
        ...state,
        items: newItems,
        totalPrice: state.totalPrice - currentTotalPrice,
        totalCount: state.totalCount - currentTotalCount,
      };
    case 'ADD_ONE_ITEM':
      const newObjPlus = [
        ...state.items[action.payload].items,
        state.items[action.payload].items[0],
      ];
      const newItemsPlus = {
        ...state.items,
        [action.payload]: {
          items: newObjPlus,
          totalPrice: totalPriceItems(newObjPlus),
        },
      };
      const getItemsPlus = Object.values(newItemsPlus).map((obj) => obj.items);
      const concatItemsPlus = [].concat.apply([], getItemsPlus);
      const totalPricePlus = totalPriceItems(concatItemsPlus);
      return {
        ...state,
        items: newItemsPlus,
        totalPrice: totalPricePlus,
        totalCount: concatItemsPlus.length,
      };
    case 'DELETE_ONE_ITEM':
      const oldItems = state.items[action.payload].items;
      const newObjMinus = oldItems.length > 1 ? (state.items[action.payload].items.slice(1)): oldItems;
      const newItemsMinus = {
        ...state.items,
        [action.payload]: {
          items: newObjMinus,
          totalPrice: totalPriceItems(newObjMinus),
        },
      };
      const getItemsMinus = Object.values(newItemsMinus).map((obj) => obj.items);
      const concatItemsMinus = [].concat.apply([], getItemsMinus);
      const totalPriceMinus = totalPriceItems(concatItemsMinus);
      return {
        ...state,
        items: newItemsMinus,
        totalPrice: totalPriceMinus,
        totalCount: concatItemsMinus.length,
      };
    default:
      return state;
  }
};
export default cart;
