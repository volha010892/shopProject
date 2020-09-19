import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from './Button';

function Items({ id, name, url, price, types, size, onClickAddItem, countItem }) {
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);

  const onSelectType = (index) => {
    setActiveType(index);
  };

  const onSelectSize = (index) => {
    setActiveSize(index);
  };
  let availableTypes = types.map((element) => {
    if (element === 0) return 'gold';
    if (element === 1) return 'platina';
    if (element === 2) return 'silver';
  });

  const onAddItem = () => {
    const obj = {
      id,
      name,
      url,
      price,
      size: size[activeSize],
      type: availableTypes[activeType],
    };
    onClickAddItem(obj);
  };

  return (
    <div className="jew-block">
      {url && <img className="jew-block__image" src={url} alt="Jew" />}
      <h4 className="jew-block__title">{name}</h4>
      <div className="jew-block__selector">
        <ul>
          {availableTypes &&
            availableTypes.map((type, index) => (
              <li
                onClick={() => onSelectType(index)}
                key={type}
                className={classNames({ active: activeType === index })}>
                {type}
              </li>
            ))}
        </ul>
        <ul>
          {size == 0 && <li className="active">one size </li>}
          {size != 0 &&
            size.map((size, index) => (
              <li
                onClick={() => onSelectSize(index)}
                key={size}
                className={classNames({ active: activeSize === index })}>
                {size}
              </li>
            ))}
        </ul>
      </div>
      <div className="jew-block__bottom">
        <div className="jew-block__price">{price} €</div>
        <Button onClick={onAddItem} className="button--add" outline>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {countItem && <i>{countItem}</i>}
        </Button>
      </div>
    </div>
  );
}
Items.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  addItem: PropTypes.func,
  types: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number).isRequired,
    PropTypes.number.isRequired,
  ]),
  size: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.arrayOf(PropTypes.number).isRequired,
  ]),
  countItem: PropTypes.number,
};

export default Items;
