import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Stepper.css';
import Nav from '../Nav/Nav';

export default function Stepper() {

  // Using hooks to access redux and saga
  const dispatch = useDispatch();
  const inputData = useSelector(state => state.input);
  const questionData = useSelector(state => state.question);
  const splitData = useSelector(state => state.split);
  const lastPageID = useSelector(state => state.previousQuestion);
  const history = useHistory();
  const [input, setInput] = useState(inputData[questionData.question_id] || '');
  const [splitNext, setSplitNext] = useState('');

  useEffect(()=>{
    setInput(inputData[questionData.question_id] || '');
  }, [inputData, questionData.question_id]);
  
  useEffect(()=>{
    if(questionData.split){
      setSplitNext(splitData[0] && splitData[0].next_id || '');
    }
  }, [questionData.split, inputData, questionData.question_id, splitData]);

  // Adds class if input has a value, removes the class if input has no value
  const checkForValue = e => e.target.value ? e.target.classList.add('text-field-active') : e.target.classList.remove('text-field-active');

  const handleChange = e => {
    setInput(e.target.value);
    checkForValue(e);
  }
  // Push to next question
  function nextPage() {
    dispatch({ type: 'ADD_PREVIOUS_QUESTION', payload: questionData.id });
    dispatch({type: 'ADD_INPUT_VALUE', payload:{key: questionData.question_id, value: input}});
    setInput('');
    if (questionData.next_id == null) {
      const url = questionData.calculator.replace(/ /g, '-').toLowerCase();
      history.push(`/${url}`);
    } else if (questionData.split) {
      dispatch({ type: 'GET_QUESTION', payload: { query: { id: splitNext } } });
    } else {
      dispatch({ type: 'GET_QUESTION', payload: { query: { id: questionData.next_id } } });
    }
  }

  // Push to previous question
  function lastPage() {
    if (lastPageID.length === 0) {
      history.push('/');
    } else {
      dispatch({ type: 'GET_QUESTION', payload: { query: { id: lastPageID.pop() } } });
      let holder = lastPageID; // used because lastPageID is modified on the previous line
      dispatch({ type: 'NEXT_PREVIOUS_QUESTION', payload: holder });
    }
  }

  return (
    <center>
      <Nav />
      <div className='main-container'>
        <p>
          <p className="question-text">
            {questionData.question}
          </p>
          <br />
          {questionData.split ?
            splitData.map(split => {
              return (
                <span key={split.id}>
                  <label className="radio-container">{split.split_text}
                    <input
                      type="radio"
                      name="next"
                      value={split.next_id}
                      checked={+splitNext === split.next_id}
                      onChange={(e) => { setSplitNext(split.next_id); setInput(e.target.value) }}
                    />
                    <span className="radio-btn"></span>
                  </label>
                </span>
              );
            })
            :
            <center>
              <div className="text-field-container">
                <input 
                  className="text-field"
                  value={input} 
                  onChange={(e)=>handleChange(e)} 
                  type={questionData.response_type} 
                  autoFocus
                />
                <label className="text-field-label">enter value</label>
                <div className="text-field-mask stepper-mask"></div>
                <div className="tooltip-background">
                  <span className="tooltip-icon">?</span>
                </div>
              </div>
            </center>
          }
          <br />
          <p className="question-text">
            {questionData.help_text}
          </p>
        </p>
        <div onClick={lastPage} className='arrow-left' />
        <div onClick={nextPage} className='arrow-right' />
      </div>
    </center>
  );
}