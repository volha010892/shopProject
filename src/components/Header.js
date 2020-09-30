import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logoSvg from '../img/logo.svg';
import accountIcon from '../img/accountIcon.png';
import ButtonCart from './Button';
import Account from './Account';

function Header() {
  const [isOpenAccount, setIsOpenAccount] = React.useState(false);
  const { totalPrice, totalCount } = useSelector(({ cart }) => ({
    totalPrice: cart.totalPrice,
    totalCount: cart.totalCount,
  }));
  const openAccount = () => {
    setIsOpenAccount(!isOpenAccount);
  };
  return (
    <div>
      <div className="header">
        <div className="container">
          <Link to="/">
            <div className="header__logo">
            <img width="60" height="60" src={logoSvg} alt="logo" />
              <div>
                <h1>Jewellery</h1>
                <h3>самая стильная бижутерия</h3>
              </div>
            </div>
          </Link>
          <div className="account__cart">
            <div className="button" onClick={openAccount}>
              <img height="30" src={accountIcon} alt="icon" />
            </div>
            <div className="header__cart">
              <Link to="/cart">
                <ButtonCart className="button button--cart">
                  <div className="button__cart__inline">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                        stroke="black"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                        stroke="black"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                        stroke="black"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="button__cart__inline">
                    <span>{totalPrice} €</span>
                    <div className="button__delimiter"></div>
                    <span>{totalCount}</span>
                  </div>
                </ButtonCart>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={isOpenAccount ? 'set_account' : 'none_account'}>
      <Account />
      </div>
    </div>
  );
}

export default Header;
