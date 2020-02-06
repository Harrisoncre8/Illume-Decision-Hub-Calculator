import React from 'react';
import { useHistory } from 'react-router-dom';
import './Nav.css';
import { useDispatch } from 'react-redux';

export default function Nav() {

  // react router hook
  let history = useHistory();
  const dispatch = useDispatch();

  const setStart = id => {
    dispatch({ type: 'CLEAR_PREVIOUS_QUESTION' });
    dispatch({type: 'GET_QUESTION', payload: {query: {start: id}}});
    history.push('/questionnaire');
  }

  function logout() {
    dispatch({type: 'LOGOUT'});
    history.push('/');
  }

  return (
    <div className='nav-div'>
      <button className='circle-btn' onClick={()=>setStart(2)}>
        Break Even Calculator</button>
      <button className='circle-btn' onClick={()=>setStart(1)}>
        Profit Lever Calculator</button>
      <button className='circle-btn' onClick={()=>setStart(3)}>
        Price Setting Calculator</button>
      <button className='circle-btn' onClick={logout}>
        Log <br /> Out</button>
    </div>
  );
}