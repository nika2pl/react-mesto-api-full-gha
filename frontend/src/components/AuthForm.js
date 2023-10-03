import React from "react";
import { NavLink } from 'react-router-dom';
import "../auth.css";

function AuthForm({title, submit, email, password, onChange, submitText, isSignUp}) {
    return (
        <section className="auth__container">
            <h2 className="auth__title">{title}</h2>
            <form className="auth__form" onSubmit={submit}>
                <input
                    className="auth__input"
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={onChange}
                    required
                />

                <input
                    className="auth__input"
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={onChange}
                    autoComplete="off"
                    minLength="5"
                    required
                />
                
                <button className="auth__button" type="submit">
                    {submitText}
                </button>
            </form>
            {isSignUp && (<span className="auth__link">Уже зарегестрированы? <NavLink to='/sign-in'>Войти</NavLink></span>)}
        </section>
    );
}
export default AuthForm;