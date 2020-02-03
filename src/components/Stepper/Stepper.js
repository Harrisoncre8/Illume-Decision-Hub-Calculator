import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function Stepper() {
  // Using hooks to access redux and saga
  let dispatch = useDispatch();
  let questionData = useSelector(state => state.question)
  let history = useHistory();


  function nextPage() {
    if (questionData.next_id == null) {
      const url = questionData.calculator.replace(/ /g, '-').toLowerCase();
      history.push(`/${url}`)
    } else {
      dispatch({ type: 'GET_QUESTION', payload: { querry: { id: questionData.next_id } } })
    }
  }

  return (
    <div className='main-container'>
      {JSON.stringify(questionData)}
      <p>
        {questionData.question} <input type={questionData.response_type} />{questionData.help_text}</p>
      <div className='arrow-left' />
      <div onClick={nextPage} className='arrow-right' />
    </div>
  );
}