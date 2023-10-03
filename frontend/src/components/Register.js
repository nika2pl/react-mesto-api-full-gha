import React from "react";
import AuthForm from './AuthForm';

function Register ({onSubmit}) {
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
            title="Регистрация"
            submit={handleSubmit}
            onChange={handleChange}
            submitText="Зарегистрироваться"
            email={email}
            password={password}
            isSignUp={true}
        />
    );
}

export default Register;