import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function Stepper() {
  // Using hooks to access redux and saga
  let dispatch = useDispatch();
  let questionData = useSelector(state => state.question);
  let splitData = useSelector(state => state.split);
  let history = useHistory();

	const [splitNext, setSplitNext] = useState('');

  function nextPage() {
    if (questionData.next_id == null) {
      const url = questionData.calculator.replace(/ /g, '-').toLowerCase();
      history.push(`/${url}`);
		} else if(questionData.split){
			dispatch({ type: 'GET_QUESTION', payload: { query: { id: splitNext } } });
		} else {
      dispatch({ type: 'GET_QUESTION', payload: { query: { id: questionData.next_id } } });
    }
  }

  return (
    <div className='main-container'>
      <p>
        {questionData.question} 
        {questionData.split? 
          splitData.map((split)=>{
            return(
              <>
									<input 
										type="radio" 
										name="next" 
										value={split.next_id}
										checked={splitNext === split.next_id}
										onChange={()=>{setSplitNext(split.next_id)}}
								/> 
								{split.split_text}
							</>
          )})
          :
          <input type={questionData.response_type} />}
        {questionData.help_text}
      </p>
      <div className='arrow-left' />
      <div onClick={nextPage} className='arrow-right' />
    </div>
  );
}