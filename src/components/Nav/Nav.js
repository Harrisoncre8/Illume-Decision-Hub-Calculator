import React from 'react';
import { useHistory } from 'react-router-dom';
import './Nav.css';
import { useDispatch } from 'react-redux';

export default function Nav() {
  // react router hook
  let history = useHistory();
  const dispatch = useDispatch();

  function profitLever() {
    dispatch({type: 'GET_QUESTION', payload: {
      querry: {
        start: 1
      }
    }})
    history.push('/questionaire')
  }

  return (
    <div className='nav-div'>
      <button className='circle-btn' onClick={() => history.push('/break-even')}>
        Break Even Calculator</button>
      <button className='circle-btn' onClick={() => profitLever()}>
        Profit Lever Calculator</button>
      <button className='circle-btn' onClick={() => history.push('/price-setting')}>
        Price Setting Calculator</button>
      <button className='circle-btn' onClick={() => history.push('/')}>
        Log <br /> Out</button>
    </div>
  );
}