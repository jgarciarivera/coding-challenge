import React, { useState } from "react"

export const Login = (props) => {

    const [inputUsername, setInputUsername] = useState('');
    const [inputPassword, setInputPassword] = useState('');

    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log(`You are attempting to authentication with [Username: ${inputUsername}, Password: ${inputPassword}.`);

        if (await credentialsAreValid()) {
            // TODO: Get list of people
            console.log("Authentication successful!");
            alert("Authentication successful!");
            props.onFormSwitch('people')
        } else {
            // TODO: Display login error message
            console.log("Authentication failed.");
            alert("Authentication failed!");
        }
    }

    // TODO: Implement request to get bearer token
    // TODO: Move this method into another class responsible for making HTTP requests
    const credentialsAreValid = async () => {

        // TODO: Move this into a constants file?
        let url = "https://umbrage-interview-api.herokuapp.com/login";
        let requestBody = {username: inputUsername, password: inputPassword};

        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(requestBody)
        });

        let data = response.json();
        return response.ok;
    }

    return (
        <div className="login-form-container">
            
        <form className="login-form" onSubmit={ handleSubmit }>

            <label className="welcome-header">Welcome</label>

            <label htmlFor="username">Username</label>

            <input type="username" value={inputUsername} onChange={(e) => setInputUsername(e.target.value)} placeholder="example@email.com" id="username" name="username"></input>

            <label htmlFor="password">Password</label>

            <input type="password" value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} placeholder="**********" id="password" name="password"></input>

            <button type="submit" onClick={ handleSubmit }>Log In</button>
        </form>

        </div>
    )
}