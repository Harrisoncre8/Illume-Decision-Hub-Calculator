import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';

import Admin from '../Admin/Admin';
import AdminEditCalc from '../AdminEditCalc/AdminEditCalc';
import AdminEditIndustry from '../AdminEditIndustry/AdminEditIndustry';
import AdminEditUserInfo from '../AdminEditUserInfo/AdminEditUserInfo';
import BreakEven from '../BreakEven/BreakEven';
import Login from '../Login/Login';
import Nav from '../Nav/Nav';
import PriceSetting from '../PriceSetting/PriceSetting';
import ProfitLever from '../ProfitLever/ProfitLever';
import Register from '../Register/Register';
import Stepper from '../Stepper/Stepper';
import User from '../User/User';

function App() {
  return (
    <Router>
      <Nav />
      <div className="App">
        <Route exact path='/' component={Login} />
        <Route exact path='/admin' component={Admin} />
        <Route exact path='/admin/edit-calculator-info' component={AdminEditCalc} />
        <Route exact path='/admin/edit-industry-info' component={AdminEditIndustry} />
        <Route exact path='/admin/edit-user-info' component={AdminEditUserInfo} />
        <Route exact path='/break-even-pricing' component={BreakEven} /> 
        <Route exact path='/price-setting' component={PriceSetting} />
        <Route exact path='/define-your-profit-lever' component={ProfitLever} />
        <Route exact path='/questionnaire' component={Stepper} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/profit-lever' component={ProfitLever} />
        <Route exact path ='/questionaire' component={Stepper} />
        <Route exact path ='/admin' component={Admin} />
        <Route exact path ='/admin/edit-user-info' component={AdminEditUserInfo} />
        <Route exact path ='/user' component={User} />
      </div>
    </Router>
  );
}

export default App;
