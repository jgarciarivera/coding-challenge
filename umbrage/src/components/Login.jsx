import React, { useState } from "react";

export const Login = ({ onLogin }) => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let url = "https://umbrage-interview-api.herokuapp.com/login";
    let body = { username: inputUsername, password: inputPassword };

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Username or password is invalid.");
        }
        return response.json();
      })
      .then((data) => {
        const token = data.access_token;
        onLogin(token);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="welcome-header">Welcome</label>
        <label htmlFor="username">Username</label>
        <input
          type="username"
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
          placeholder="example@email.com"
          id="username"
          name="username"
        ></input>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          placeholder="**********"
          id="password"
          name="password"
        ></input>
        <button type="submit" onClick={handleSubmit}>
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
