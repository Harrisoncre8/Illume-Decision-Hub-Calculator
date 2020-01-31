import React from 'react';
import './App.css';
import BreakEven from '../BreakEven/BreakEven';
import PriceSetting from '../PriceSetting/PriceSetting';
import ProfitLever from '../ProfitLever/ProfitLever';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Stepper from '../Stepper/Stepper';

function App() {
  return (
    <div className="App">
      <BreakEven/>
      <PriceSetting/>
      <Login />
      <Register />
      <ProfitLever />
      <Stepper />
    </div>
  );
}

export default App;
