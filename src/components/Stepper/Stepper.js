import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Nav from '../Nav/Nav';

export default function Stepper() {
  // Using hooks to access redux and saga
  const dispatch = useDispatch();
  const inputData = useSelector(state => state.input);
  const questionData = useSelector(state => state.question);
  const splitData = useSelector(state => state.split);
  const lastPageID = useSelector(state => state.previousQuestion)
  const history = useHistory();
  const [input, setInput] = useState(inputData[questionData.question_id] || '');
  const [splitNext, setSplitNext] = useState('');

  useEffect(()=>{
    setInput(inputData[questionData.question_id] || '');
  }, [inputData, questionData.question_id])
  
  useEffect(()=>{
    if(questionData.split){
      setSplitNext(splitData[0] && splitData[0].next_id || '')
    }
  }, [questionData.split, inputData, questionData.question_id, splitData])


  // Push to next question
  function nextPage() {
    dispatch({ type: 'ADD_PREVIOUS_QUESTION', payload: questionData.id })
    dispatch({type: 'ADD_INPUT_VALUE', payload:{key: questionData.question_id, value: input}})
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
      <div className='stepper-container'>
        <p>
          {questionData.question}<br/>
          {questionData.split ?
            splitData.map(split => {
              return (
                <span key={split.id}>
                  <input
                    type="radio"
                    name="next"
                    value={split.next_id}
                    checked={+splitNext === split.next_id}
                    onChange={(e) => { setSplitNext(split.next_id); setInput(e.target.value) }}
                  />
                  {split.split_text}
                </span>
              );
            })
            :
            <input 
              className="stepper-input"
              value={input} 
              onChange={(e)=>setInput(e.target.value)} 
              type={questionData.response_type} 
            />
          }
          <br/>{questionData.help_text}
        </p>
        <div onClick={lastPage} className='arrow-left' />
        <div onClick={nextPage} className='arrow-right' />
      </div>
    </center>
  );
}