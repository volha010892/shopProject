import React from 'react';
import PropTypes from 'prop-types';

const Categories = React.memo(function Categories({ activCategory, categories, onClickItem }) {

  return (
    <div className="categories">
      <ul>
        <li className={activCategory === null ? 'active' : ''} onClick={() => onClickItem(null)}>
          Все
        </li>
        {categories &&
          categories.map((name, index) => (
            <li
              className={activCategory === index ? 'active' : ''}
              onClick={() => onClickItem(index)}
              key={`${name}_${index}`}>
              {name}
            </li>
          ))}
      </ul>
    </div>
  );
});
Categories.propTypes = {
  onClickItem: PropTypes.func,
  categories: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.arrayOf(PropTypes.string).isRequired,
  ]),
};


export default Categories;
