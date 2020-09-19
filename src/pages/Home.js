import React from 'react';
import { Items, Categories, Sort, MyLoader } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { itemsThunkAC } from '../../redux/fetchThunk';
import { setSortBy, setCategory } from '../../AC/filtersAC';
import mobileMenu from '../img/mobileMenu.png';
import orderBy from 'lodash/orderBy';
import Button from '../components/Button';

const categoriesArr = ['Кольца', 'Цепочки', 'Серьги', 'Браслеты', 'Кулоны'];
const sortArr = [
  { name: 'популярности', type: 'id' },
  { name: 'цене', type: 'price' },
  { name: 'алфавит', type: 'name' },
];

function Home() {
  let getItems = [];
  let sortItems = [];
  const mobMenuRef = React.useRef();
  const dispatch = useDispatch();
  const items = useSelector(({ items }) => items);
  const cartItems = useSelector(({ cart }) => cart.items);
  const [limit, setPageNumber] = React.useState(1);
  const { sortBy, category } = useSelector(({ filters }) => filters);
  const [activeMobMenu, setActiveMobMenu] = React.useState(false);
  const numberOfPage = () => {
    setPageNumber(limit+1);
  };
  
  React.useEffect(() => dispatch(itemsThunkAC(dispatch, category, limit )), [sortBy, category, limit]);
  const onSelectCategory = React.useCallback((index) => {
    dispatch(setCategory(index));
  }, []);

  const onSelectSortType = React.useCallback((type) => {
    dispatch(setSortBy(type));
  }, []);

  const addItemCart = (obj) => {
    dispatch({
      type: 'ADD_ITEM_CART',
      payload: obj,
    });
  };
  const showMobileMenu = () => {
    setActiveMobMenu(!activeMobMenu);
  };
  const handleOutsideClick = (event) => {
    const path = event.path || (event.composedPath && event.composedPath());
    if (!path.includes(mobMenuRef.current)) {
      setActiveMobMenu(false);
    }
  };
  React.useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);
  }, []);

  const itemsLoadingArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  if (items.data) {
    !Array.isArray(items.data)
      ? Object.keys(items.data).map((obj) => getItems.push(items.data[obj]))
      : (getItems = items.data);
    sortItems = orderBy(getItems, sortBy, 'DESC');
  }
  return (
    <div className="container">
      <div className="content__top">
        <div className="categories__none">
          <Categories
            activCategory={category}
            onClickItem={onSelectCategory}
            categories={categoriesArr}
          />
        </div>
        <div ref={mobMenuRef} className="hamburger-menu">
          <div onClick={showMobileMenu} className="menu__btn">
            <img width="60" src={mobileMenu} alt="menu" />
          </div>
        </div>
        <Sort activeSortType={sortBy} items={sortArr} onClickSortType={onSelectSortType} />
      </div>
      <div className={activeMobMenu ? 'menu__box__visible' : 'menu__box__hidden'}>
        <Categories
          activCategory={category}
          onClickItem={onSelectCategory}
          categories={categoriesArr}
        />
      </div>
      <h2 className="content__title">Все украшения</h2>
      <div className="content__items">
        {items.status <= 1 && itemsLoadingArray.map((index) => <MyLoader key={index} />)}
        {items.status === 2 && itemsLoadingArray.map((index) => <MyLoader key={index} />)}
        {items.status === 3 &&
          sortItems.map((obj, index) => (
            <Items
              onClickAddItem={addItemCart}
              key={index}
              countItem={cartItems[obj.id] && cartItems[obj.id].items.length}
              {...obj}
            />
          ))}
      </div>
      <div className="cart cart--empty">
        <Button onClick={numberOfPage} className="button button--black">
          <span>Show more</span>
        </Button>
      </div>
    </div>
  );
}

export default Home;
