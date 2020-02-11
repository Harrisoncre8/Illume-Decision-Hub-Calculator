import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './NewUser.css';
import Nav from '../Nav/Nav';
import QuestionCheckboxes from '../QuestionCheckboxes/QuestionCheckboxes';

export default function NewUser(){

  const dispatch = useDispatch();
  const user = useSelector(state => state.userInfo);
  const userID = useSelector(state => state.user.id);

  // Run on component mount
  useEffect(()=>{
    dispatch({type: `GET_USER_INFO`, payload: userID});
  }, [userID]);

  return(
    <center>
      <Nav />
      <div className='main-container'>
        <div className="top-card-container">
          <h1 className='user-spacing'>Welcome, {user[0] && user[0].name}!</h1>
          <h3 className='user-spacing'>What is the Illume Decision Hub Calculator?</h3>
          <div className="new-user-text-container">
            <p className="results-text">This application is designed to help you generate more profits.</p>
            <p className="results-text">
              Using conversational language through a “choose your own adventure” format, you will 
              be prompted to enter your financial information to create predictive calculations based 
              on business decisions you can make around product pricing, operating costs, and total revenue.
            </p>
            <p className="results-text">
              This will help you better understand how changes in your decision-making and pricing could affect 
              your future profitability.
            </p>
          </div>
          <p className="results-text new-user-cta-text">Click on a Calculator above to begin!</p>
          <QuestionCheckboxes />
        </div>
      </div>
    </center>
  );
}