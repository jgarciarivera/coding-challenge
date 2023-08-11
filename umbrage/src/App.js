import logo from './logo.svg';
import './App.css';
import { Login } from './components/Login';
import { People } from './components/People';
import React, { useState } from "react"


function App() {

  const [ currentForm, setCurrentForm ] = useState('login');

  const switchForm = (name) => {
    setCurrentForm(name);
  }

  return (
    <div className="App">
      { currentForm === 'login' ? <Login onFormSwitch={ switchForm }/> : <People/> }
    </div>
  );
}

export default App;
