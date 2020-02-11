import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Nav from '../Nav/Nav';
import QuestionCheckboxes from '../QuestionCheckboxes/QuestionCheckboxes';

export default function NewUser(){

  const dispatch = useDispatch();
  const user = useSelector(state => state.userInfo);
  const userID = useSelector(state => state.user.id);

  useEffect(()=>{
    dispatch({type: `GET_USER_INFO`, payload: userID});
  }, [userID]);

  return(
    <center>
      <Nav />
      <div className='main-container'>
        <h1 className='user-spacing'>Welcome, {user.map(name=><span key={name.id}>{name.name}</span>)}!</h1>
        <h3 className='user-spacing'>What is the Illume Decision Hub Calculator?</h3>
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