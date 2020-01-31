import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import './App.css';
import Price from '../BreakEven/BreakEven';
import ProfitLever from '../ProfitLever/ProfitLever';
import Login from '../Login/Login';
import Stepper from '../Stepper/Stepper';

function App() {
  return (
    <Router>
      <div className="App">
        
        <Route exact path="price" component={Price}/>
        <Login />
        <ProfitLever />
        <Stepper />
      </div>
    </Router>  
  );
}

export default App;
