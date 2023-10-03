import logo from '../images/logo.svg';
import { React, useState } from 'react';

import { NavLink, Routes, Route } from 'react-router-dom';

function Header({handleLogout, email}) {

  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  function handleBurger() {
    setIsBurgerOpen(!isBurgerOpen);
  }

  const burgerClassName = isBurgerOpen
    ? 'header__dropdown-navigation-active'
    : 'header__dropdown-navigation';


  function onLogout() {
    handleLogout();
  }

  return (
    <>
      {isBurgerOpen && (
        <div className="header__navigation">
          <p className="header__navigation-text">{email}</p>
          <button onClick={onLogout} className="header__navigation-button">
            Выйти
          </button>
        </div>
      )}

      <header className="header">
        <img src={logo} alt="Логотип сервиса Место" className="header__logo logo" />

        <Routes>
        <Route
            path="/sign-up"
            element={<>
              <NavLink to='/sign-in' className="header__navigation-sign-text">
                Войти
              </NavLink>
            </>}
          />

         <Route
            path="/sign-in"
            element={<>
              <NavLink to='/sign-up' className="header__navigation-sign-text">
                Регистрация
              </NavLink>
            </>}
          />

          <Route
            path="/"
            element={<>
              <div className="header__dropdown" onClick={handleBurger}>
                <div className={burgerClassName} />
              </div>
              <div className="header__dropdown-container">
                <p className="header__dropdown-text">{email}</p>
                <button onClick={onLogout} className="header__dropdown-button">
                  Выйти
                </button>
              </div>
            </>}
          />
        </Routes>
      </header>
    </>
  );
}

export default Header;
