import React from 'react';
import './App.css';
import Price from '../BreakEven/BreakEven';
import ProfitLever from '../ProfitLever/ProfitLever';
import Login from '../Login/Login';
import Stepper from '../Stepper/Stepper';

function App() {
  return (
    <div className="App">
      <Price />
      <Login />
      <ProfitLever />
      <Stepper />
    </div>
  );
}

export default App;
