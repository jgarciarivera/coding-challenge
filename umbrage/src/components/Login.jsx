import React, { useState } from "react";
import { Form } from "react-bootstrap";

export const Login = ({ onLogin }) => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("https://umbrage-interview-api.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: inputUsername,
        password: inputPassword,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Login failed. Request returned the following response: "${response.status} ${response.statusText}"`
          );
        }
        return response.json();
      })
      .then((data) => {
        const token = data.access_token;
        onLogin(token);
      })
      .catch((error) => {
        console.error("Error", error);
        alert(error.message);
      });
  };

  return (
    <div className="login-form-container">
      <Form.Group className="login-form" onSubmit={handleSubmit}>
        <label className="welcome-header">Welcome</label>
        <label htmlFor="username">Username</label>
        <input
          type="username"
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
          placeholder="example@email.com"
          id="username"
          name="username"
          autoComplete="off"
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
        <button
          disabled={!inputUsername || !inputPassword}
          className="login-button"
          type="submit"
          onClick={handleSubmit}
        >
          Log In
        </button>
      </Form.Group>
    </div>
  );
};

export default Login;
