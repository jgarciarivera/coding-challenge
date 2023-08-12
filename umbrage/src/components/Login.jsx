import React, { useState } from "react"

export const Login = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("You are attempting to authenticate using the following credentials.");
        console.log(`Username: ${ username }, Password: ${ password }`);
    }

    return (
        <div className="login-form-container">
        <form className="login-form" onSubmit={ handleSubmit }>
            <label className="welcome-header">Welcome</label>
            <label htmlFor="username">Username</label>
            <input type="username" placeholder="example@email.com" id="username" name="username"></input>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="**********" id="password" name="password"></input>
            <button type="submit" onClick={() => props.onFormSwitch('people')}>Log In</button>
        </form>
        </div>
    )
}