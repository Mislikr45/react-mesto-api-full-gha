import { Link, Route, Routes } from "react-router-dom";
import React from "react";
import headerLogo from "../images/logo.svg";
function Header({ handleSignOut, userEmail }) {
  return (
    <header className="header">
      <img src={headerLogo} alt="логотип." className="header__logo" />
      <Routes>
        <Route
          path="/main"
          element={
            <div className="header__routes">
              <p className="header__email">{userEmail.email}</p>
              <button
                className="header__signout"
                type="button"
                onClick={handleSignOut}
              >
                Выйти
              </button>
            </div>
          }
        />

        <Route
          path="/sign-up"
          element={
            <Link className="header__link" to="/sign-in">
              Войти
            </Link>
          }
        />

        <Route
          path="/sign-in"
          element={
            <Link className="header__link" to="/sign-up">
              Регистрация
            </Link>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
