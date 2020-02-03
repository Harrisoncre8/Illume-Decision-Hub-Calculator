import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';

import BreakEven from '../BreakEven/BreakEven';
import PriceSetting from '../PriceSetting/PriceSetting';
import ProfitLever from '../ProfitLever/ProfitLever';
import Login from '../Login/Login';
import Nav from '../Nav/Nav';
import Register from '../Register/Register';
import Stepper from '../Stepper/Stepper';
import Admin from '../Admin/Admin';
import AdminEditUserInfo from '../AdminEditUserInfo/AdminEditUserInfo';

function App() {
  return (
    <Router>
      <Nav />
      <div className="App">
        <Route exact path='/' component={Login} />
        <Route exact path='/break-even' component={BreakEven} /> 
        <Route exact path='/price-setting' component={PriceSetting} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/profit-lever' component={ProfitLever} />
        <Route exact path ='/questionaire' component={Stepper} />
        <Route exact path ='/admin' component={Admin} />
        <Route exact path ='/admin/edit-user-info' component={AdminEditUserInfo} />
      </div>
    </Router>
  );
}

export default App;
