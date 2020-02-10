import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Nav from '../Nav/Nav';
import QuestionCheckboxes from '../QuestionCheckboxes/QuestionCheckboxes';

export default function NewUser(){

  // hooks for redux and sagas
  let dispatch = useDispatch();
  let userData = useSelector(state => state.admin.adminUserInfo);

  // Run on component mount
  useEffect(() => {
    dispatch({type: `GET_ADMIN_USER_INFO`});
  }, [dispatch]);

  return(
    <center>
      <Nav />
      <div className='main-container'>
        <h1 className='user-spacing'>Welcome, {}</h1>
        <h2 className='user-spacing'>What is the Illume Decision Hub Calculator?</h2>
        <h3 className='user-spacing'>
          This application is designed to help you generate more profits. 
          Using conversational language through a “choose your own adventure” format, you will 
          be prompted to enter your financial information to create predictive calculations based 
          on business decisions you can make around product pricing, operating costs, and total revenue. 
          This will help you better understand how changes in your decision-making and pricing could affect 
          your future profitability.
          <br/>
          <br/>
          Click on a Calculator above to begin!
        </h3>
        <QuestionCheckboxes />
      </div>
    </center>
  );
}