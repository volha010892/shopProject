const ITEMS_LOADING='ITEMS_LOADING';
const ITEMS_ERROR='ITEMS_ERROR';
const ITEMS_SET='ITEMS_SET';

const itemsLoadingAC=function() {
  return {
    type: ITEMS_LOADING,
  };
}

const itemsErrorAC=function() {
  return {
    type: ITEMS_ERROR,
  };
}

const itemsSetAC=function(items) {
  return {
    type: ITEMS_SET,
    items:items,
  };
}

export {
    itemsLoadingAC,ITEMS_LOADING,
    itemsErrorAC,ITEMS_ERROR,
    itemsSetAC,ITEMS_SET,
}