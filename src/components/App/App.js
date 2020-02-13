import React, { useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import './App.css';
import Admin from '../Admin/Admin';
import AdminEditCalc from '../AdminEditCalc/AdminEditCalc';
import AdminEditIndustry from '../AdminEditIndustry/AdminEditIndustry';
import AdminEditUserInfo from '../AdminEditUserInfo/AdminEditUserInfo';
import BreakEven from '../BreakEven/BreakEven';
import CheckIndustry from '../CheckIndustry/CheckIndustry';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import NewUser from '../NewUser/NewUser';
import NotFoundPage from '../NotFound/NotFound';
import PriceSetting from '../PriceSetting/PriceSetting';
import ProfitLever from '../ProfitLever/ProfitLever';
import Register from '../Register/Register';
import Stepper from '../Stepper/Stepper';
import User from '../User/User';

export default function App() {
  // gets user info on all pages DO NOT REMOVE
  const dispatch = useCallback(useDispatch());
  const userID = useSelector(state => state.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  },[dispatch]);

  useEffect(() => {
    if(userID && userID.id){
      dispatch({ type: 'GET_USER_INFO', payload: userID.id });
    }
  },[dispatch, userID]);
  
  return (
    <>
      <CheckIndustry />
      <Router>
        <Switch>
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
          <Route exact path ='/user' component={User} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}
