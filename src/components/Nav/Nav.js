import React from 'react';
import { useHistory } from 'react-router-dom';
import './Nav.css';
import { useDispatch } from 'react-redux';

export default function Nav() {
  // react router hook
  let history = useHistory();
  const dispatch = useDispatch();

  function profitLever() {
    dispatch({ type: 'CLEAR_PREVIOUS_QUESTION' });
    dispatch({
      type: 'GET_QUESTION', payload: {
        query: {
          start: 1
        }
      }
    });
    history.push('/questionnaire');
  }

  function priceSetting() {
    dispatch({ type: 'CLEAR_PREVIOUS_QUESTION' });
    dispatch({
      type: 'GET_QUESTION', payload: {
        query: {
          start: 3
        }
      }
    });
    history.push('/questionnaire');
  }

  function breakEven() {
    dispatch({ type: 'CLEAR_PREVIOUS_QUESTION' });
    dispatch({
      type: 'GET_QUESTION', payload: {
        query: {
          start: 2
        }
      }
    });
    history.push('/questionnaire');
  }

  return (
    <div className='nav-div'>
      <button className='circle-btn' onClick={breakEven}>
        Break Even Calculator</button>
      <button className='circle-btn' onClick={profitLever}>
        Profit Lever Calculator</button>
      <button className='circle-btn' onClick={priceSetting}>
        Price Setting Calculator</button>
      <button className='circle-btn' onClick={() => dispatch({ type: 'LOGOUT' })}>
        Log <br /> Out</button>
    </div>
  );
}