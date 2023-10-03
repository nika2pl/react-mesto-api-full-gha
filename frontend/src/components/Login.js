import React from "react";
import AuthForm from './AuthForm';

function Login({ onSubmit }) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function handleSubmit(e) {
        e.preventDefault();

        if (!email || !password) {
            return;
        }

        onSubmit(email, password);
    }

    function handleChange(evt) {
        if (evt.target.name === 'email') {
            setEmail(evt.target.value);
        } else if (evt.target.name === 'password') {
            setPassword(evt.target.value);
        }
    }

    return (
        <AuthForm
            title="Вход"
            submit={handleSubmit}
            onChange={handleChange}
            submitText="Войти"
            email={email}
            password={password}
            isSignup={false}
        />
    );
}

export default Login;