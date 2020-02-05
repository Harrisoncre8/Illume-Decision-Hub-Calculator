import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import {connect} from 'react-redux';
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
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render(){
    return (
      <Router>
        <Nav />
        <Switch>
          <div className="App">
            <Route exact path='/' component={Login} />
            <ProtectedRoute exact path='/admin' component={Admin} />
            <ProtectedRoute exact path='/admin/edit-calculator-info' component={AdminEditCalc} />
            <ProtectedRoute exact path='/admin/edit-industry-info' component={AdminEditIndustry} />
            <ProtectedRoute exact path='/admin/edit-user-info' component={AdminEditUserInfo} />
            <ProtectedRoute exact path='/break-even-pricing' component={BreakEven} /> 
            <ProtectedRoute exact path='/price-setting' component={PriceSetting} />
            <ProtectedRoute exact path='/define-your-profit-lever' component={ProfitLever} />
            <ProtectedRoute exact path='/questionnaire' component={Stepper} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/new-user' component={NewUser} />
            <ProtectedRoute exact path ='/user' component={User} />
          </div>
        </Switch>
      </Router>
    );
  }
}

export default connect()(App);
