import React from 'react';
import './App.css';
import BreakEven from '../BreakEven/BreakEven';
import PriceSetting from '../PriceSetting/PriceSetting';
import Login from '../Login/Login';

function App() {
  return (
    <div className="App">
      <BreakEven/>
      <PriceSetting/>
      <Login />
    </div>
  );
}

export default App;
