import React from 'react';
import { Link} from 'react-router-dom';
function ThanksForOrder() {
  return (
    <div className="container container--cart">
      <div className=" cart--empty"><h2>Thanks for your order</h2></div>
      <div className="cart__bottom-buttons">
        <Link to="/" className="button button--outline button--add go-back-btn">
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7 13L1 6.93015L6.86175 1"
              stroke="#D3D3D3"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"></path>
          </svg>

          <span>Вернуться на главную</span>
        </Link>
      </div>
    </div>
  );
}

export default ThanksForOrder;
