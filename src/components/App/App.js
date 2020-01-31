import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import BreakEven from '../BreakEven/BreakEven';
import PriceSetting from '../PriceSetting/PriceSetting';
import ProfitLever from '../ProfitLever/ProfitLever';
import Login from '../Login/Login';
import Stepper from '../Stepper/Stepper';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path='/break-even' component={BreakEven}/> 
        <Route exact path='/price-setting' component={PriceSetting}/>
        <Route exact path='/' component={Login}/>
        <Route exact path='/profit-lever' component={ProfitLever}/>
        <Stepper />
      </div>
    </Router>
  );
}

export default App;
