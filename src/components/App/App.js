import React from 'react';
import './App.css';
<<<<<<< HEAD
// import Login from '../Login/Login';
import Register from '../Register/Register';

function App() {
  return (
    <div>
      {/* <Login /> */}
      <Register />
=======
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
>>>>>>> master
    </div>
  );
}

export default App;
