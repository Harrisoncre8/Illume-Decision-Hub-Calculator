import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import ProtectedRouteAdmin from '../ProtectedRouteAdmin/ProtectedRouteAdmin';
import { connect } from 'react-redux';
import './App.css';
import Admin from '../Admin/Admin';
import AdminEditCalc from '../AdminEditCalc/AdminEditCalc';
import AdminEditIndustry from '../AdminEditIndustry/AdminEditIndustry';
import AdminEditUserInfo from '../AdminEditUserInfo/AdminEditUserInfo';
import BreakEven from '../BreakEven/BreakEven';
import Login from '../Login/Login';
import Nav from '../Nav/Nav';
import NewUser from '../NewUser/NewUser';
import PriceSetting from '../PriceSetting/PriceSetting';
import ProfitLever from '../ProfitLever/ProfitLever';
import Register from '../Register/Register';
import Stepper from '../Stepper/Stepper';
import User from '../User/User';

class App extends Component {

  // Checks to see if user is logged in
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' })
  }

  render() {
    return (
      <Router>
        <Nav />
        <Switch>
          <div className="App">
            <Route exact path='/' component={Login} />
            <ProtectedRouteAdmin exact path='/admin' component={Admin} />
            <ProtectedRouteAdmin exact path='/admin/edit-calculator-info' component={AdminEditCalc} />
            <ProtectedRouteAdmin exact path='/admin/edit-industry-info' component={AdminEditIndustry} />
            <ProtectedRouteAdmin exact path='/admin/edit-user-info' component={AdminEditUserInfo} />
            <ProtectedRoute exact path='/break-even-pricing' component={BreakEven} />
            <ProtectedRoute exact path='/price-setting' component={PriceSetting} />
            <ProtectedRoute exact path='/define-your-profit-lever' component={ProfitLever} />
            <ProtectedRoute exact path='/questionnaire' component={Stepper} />
            <Route exact path='/register' component={Register} />
            <ProtectedRoute exact path='/new-user' component={NewUser} />
            <ProtectedRoute exact path='/user' component={User} />
          </div>
        </Switch>
      </Router>
    );
  }
}

export default connect()(App);