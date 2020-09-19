import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import logoCards from '../img/cards.png';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import * as firebase from 'firebase';

function Order() {
  const db = firebase.database();
  const { totalPrice, totalCount, items } = useSelector(({ cart }) => cart);
  const itemsCart = Object.keys(items).map((key) => {
    return items[key].items[0];
  });
  const [email, setEmail] = React.useState('');
  const [fname, setFName] = React.useState('');
  const [lname, setlName] = React.useState('');
  const [adress, setArdess] = React.useState('');
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [zip, setZip] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);
  const handleChangeFName = ({ target: { value } }) => {
    setFName(value);
  };
  const handleChangeLName = ({ target: { value } }) => {
    setlName(value);
  };
  const handleChangeEmail = ({ target: { value } }) => {
    setEmail(value);
  };
  const handleChangeAdress = ({ target: { value } }) => {
    setArdess(value);
  };
  const handleChangeCity = ({ target: { value } }) => {
    setCity(value);
  };
  const handleChangeState = ({ target: { value } }) => {
    setState(value);
  };
  const handleChangeZip = ({ target: { value } }) => {
    setZip(value);
  };
  const { register, errors, handleSubmit } = useForm({
    mode: 'onChange',
  });
  const makeAnOrder = () => {
    db.ref(`orders/${lname}/email`).push(email);
    db.ref(`orders/${lname}/lname`).push(fname);
    db.ref(`orders/${lname}/adress`).push(adress);
    db.ref(`orders/${lname}/adress`).push(city);
    db.ref(`orders/${lname}/adress`).push(state);
    db.ref(`orders/${lname}/adress`).push(zip);
    db.ref(`orders/${lname}/purchase`).push(items);
    setRedirect(true);
  };
  if (redirect) return <Redirect to="/thanks" />;
  else {
    return (
      <div>
        <div className="row">
          <div className="col-75">
            <div className="container_order">
              <form onSubmit={handleSubmit(makeAnOrder)}>
                <div className="row">
                  <div className="col-50">
                    <h3>Платежный адрес</h3>
                    <label forhtml="fname">First Name</label>
                    <input
                      type="text"
                      id="fname"
                      name="firstname"
                      placeholder="John"
                      ref={register({
                        required: 'invalid first name',
                        pattern: {
                          value: /^[a-zA-Z ]{2,30}$/,

                          message: 'invalid first name',
                        },
                      })}
                      onChange={handleChangeFName}
                    />
                    <div className="error">{errors.firstname && errors.firstname.message}</div>
                    <label forhtml="fname">Last Name</label>
                    <input
                      type="text"
                      id="lname"
                      name="lastname"
                      placeholder="Doe"
                      ref={register({
                        required: 'invalid last name',
                        pattern: {
                          value: /^[a-zA-Z ]{2,30}$/,
                          message: 'invalid last name',
                        },
                      })}
                      onChange={handleChangeLName}
                    />
                    <div className="error">{errors.lastname && errors.lastname.message}</div>
                    <label forhtml="email">Email</label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      placeholder="john@example.com"
                      ref={register({
                        required: 'invalid email address',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'invalid email address',
                        },
                      })}
                      onChange={handleChangeEmail}
                    />
                    <div className="error">{errors.email && errors.email.message}</div>
                    <label forhtml="adr">Address</label>
                    <input
                      type="text"
                      id="adr"
                      name="address"
                      placeholder="542 W. 15th Street"
                      ref={register({
                        required: 'invalid address',
                        pattern: {
                          // value:  ,
                          message: 'invalid address',
                        },
                      })}
                      onChange={handleChangeAdress}
                    />
                    <div className="error">{errors.address && errors.address.message}</div>
                    <label forhtml="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="New York"
                      ref={register({
                        required: 'invalid city',
                        pattern: {
                          value: /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/,
                          message: 'invalid city',
                        },
                      })}
                      onChange={handleChangeCity}
                    />
                    <div className="error">{errors.city && errors.city.message}</div>
                    <div className="row">
                      <div className="col-50">
                        <label forhtml="state">State</label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          placeholder="NY"
                          ref={register({
                            required: 'invalid state',
                            pattern: {
                              value: /^[A-Za-z]{2,}$/,
                              message: 'invalid state',
                            },
                          })}
                          onChange={handleChangeState}
                        />
                        <div className="error">{errors.state && errors.state.message}</div>
                      </div>
                      <div className="col-50">
                        <label forhtml="zip">Zip</label>
                        <input
                          type="text"
                          id="zip"
                          name="zip"
                          placeholder="10001"
                          ref={register({
                            required: 'invalid zip',
                            pattern: {
                              value: /^([0-9]{5})$/,
                              message: 'invalid zip',
                            },
                          })}
                          onChange={handleChangeZip}
                        />
                        <div className="error">{errors.zip && errors.zip.message}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-50">
                    <h3>Payment</h3>
                    <label forhtml="fname">Accepted Cards</label>
                    <div className="icon-container">
                      <img src={logoCards} alt="logo" />
                    </div>
                    <label forhtml="cname">Name on Card</label>
                    <input
                      type="text"
                      id="cname"
                      name="cardname"
                      placeholder="John Doe"
                      ref={register({
                        required: 'invalid cardname',
                        pattern: {
                          // value: ,
                          message: 'invalid cardname',
                        },
                      })}
                    />
                    <div className="error">{errors.cardname && errors.cardname.message}</div>
                    <label forhtml="ccnum">Credit card number</label>
                    <input
                      type="text"
                      id="ccnum"
                      name="cardnumber"
                      placeholder="1111222233334444"
                      ref={register({
                        required: 'invalid card number',
                        pattern: {
                          value: /^[0-9]{16}$/,
                          message: 'invalid card number',
                        },
                      })}
                    />
                    <div className="error">{errors.cardnumber && errors.cardnumber.message}</div>
                    <label forhtml="expmonth">Exp Month</label>
                    <input
                      type="text"
                      id="expmonth"
                      name="expmonth"
                      placeholder="05"
                      ref={register({
                        required: 'invalid Exp Month',
                        pattern: {
                          value: /^[0-9]{2}$/,
                          message: 'invalid Exp Month',
                        },
                      })}
                    />
                    <div className="error">{errors.expmonth && errors.expmonth.message}</div>
                    <div className="row">
                      <div className="col-50">
                        <label forhtml="expyear">Exp Year</label>
                        <input
                          type="text"
                          id="expyear"
                          name="expyear"
                          placeholder="2022"
                          ref={register({
                            required: 'invalid Exp Year',
                            pattern: {
                              value: /^[0-9]{4}$/,
                              message: 'invalid Exp Year',
                            },
                          })}
                        />
                        <div className="error">{errors.expyear && errors.expyear.message}</div>
                      </div>
                      <div className="col-50">
                        <label forhtml="cvv">CVV</label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          placeholder="352"
                          ref={register({
                            required: 'invalid cvv',
                            pattern: {
                              value: /^[0-9]{3}$/,
                              message: 'invalid cvv',
                            },
                          })}
                        />
                        <div className="error">{errors.cvv && errors.cvv.message}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cart__bottom-buttons">
                  <Link to="/cart" className="button button--outline button--add go-back-btn">
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
                    <span>Вернуться назад</span>
                  </Link>

                  <button type="submit" className="button pay-btn">
                    Оформить заказ
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-25">
            <div className="container_order">
              <h4>
                Cart
                <span className="price">
                  <b>{totalCount}</b>
                </span>
              </h4>
              {itemsCart.map((obj) => (
                <p key={obj.id}>
                  {obj.name}
                  <span className="price">
                    <b>
                      {obj.price}X{items[obj.id].items.length}
                    </b>
                  </span>
                </p>
              ))}
              <hr />
              <p>
                Всего
                <span className="price">
                  <b>{totalPrice}</b>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Order;
