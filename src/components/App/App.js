import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import './App.css';
import Price from '../BreakEven/BreakEven';
import Login from '../Login/Login';
import Stepper from '../Stepper/Stepper';

function App() {
  return (
    <Router>
      <div className="App">
        <Price/>
        <Login />
        <Stepper />
      </div>
    </Router>
  );
}

export default App;
