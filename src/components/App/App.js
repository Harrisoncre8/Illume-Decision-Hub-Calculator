import React from 'react';
import './App.css';
import Price from '../BreakEven/BreakEven';
import Login from '../Login/Login';
import Stepper from '../Stepper/Stepper';

function App() {
  return (
    <div className="App">
      <Price/>
      <Login />
      <Stepper />
    </div>
  );
}

export default App;
