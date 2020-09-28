import React from 'react';
import { useForm } from 'react-hook-form';
import * as firebase from '../redux/node_modules/firebase';
function Account() {
  const { register, errors, handleSubmit } = useForm({
    mode: 'onChange',
  });

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [buttonNumber, setButtonNumber] = React.useState(0);
  const [hasAccount, setHasAccount] = React.useState(false);
  const [errorAut, setErrorAut] = React.useState(false);
  const [isOpenSingForm, setIsOpenSingForm] = React.useState(false);
  const handleChangeEmail = ({ target: { value } }) => {
    setEmail(value);
  };
  const handleChangePassword = ({ target: { value } }) => {
    setPassword(value);
  };
  const isOpenFormSingUp = () => {
    setIsOpenSingForm(true);
    setButtonNumber(1);
  };
  const isOpenFormSingIn = () => {
    setIsOpenSingForm(true);
    setErrorAut(false);
    setButtonNumber(2);
  };
  const authorize = () => {
    if (buttonNumber === 1) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            setErrorAut(true);
          }
        });
    }
    if (buttonNumber === 2) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => setHasAccount(true))
        .catch((error) => (errorAutMessage = error.message));
    }
  };
  return (
    <div className="account__container ">
      <div
        className={
          isOpenSingForm ? 'sing_in_big none__sing__form' : 'sing_in_big block__sing__form'
        }>
        <button type="submit" onClick={isOpenFormSingUp} className="button ">
          <b>SingUp</b>
        </button>
        <button type="submit" onClick={isOpenFormSingIn} className="button">
          <b>SingIn</b>
        </button>
      </div>
      {hasAccount ? (
        <div className="sing_in">
          <h2>Welcom, {email}</h2>
        </div>
      ) : (
        <div className={isOpenSingForm ? ' block__sing__form' : ' none__sing__form'}>
          <div className="sing_in_big">
            <form onSubmit={handleSubmit(authorize)}>
              <div className="sing_in_form">
                <div>
                  <label forhtml="email">Email</label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="email"
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
                </div>
                <div>
                  <label forhtml="password">Password</label>
                  <input
                    type="text"
                    id="password"
                    name="password"
                    placeholder="password"
                    ref={register({
                      required:
                        'at least 1 lowercase and 1 uppercase alphabetical, 1 numeric, must be 6 characters or longer',
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
                        message:
                          'The string must contain at least 1 lowercase and 1 uppercase alphabetical, 1 numeric, 1 special characters, must be 6 characters or longer',
                      },
                    })}
                    onChange={handleChangePassword}
                  />
                  <div className="error">{errors.password && errors.password.message}</div>
                </div>
              </div>
              {errorAut && (
                <div>
                <div className="error">The email address is already in use by another account.</div>
                <button type="submit" onClick={isOpenFormSingIn} className="button">
                <b>SingIn</b>
              </button>
              </div>
              )}
              <button type="submit" className="button">
                <b>Continue</b>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
export default Account;
