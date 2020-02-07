import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

export default function AdminCalcSubquestion(props) {

  const dispatch = useDispatch();
  const [question, setQuestion] = useState(props.question);
  const [tooltip, setTooltip] = useState(props.tooltip);

  // Dispatch to saga to update question and tooltip in database
  const handleSave = () => {
    let id = [props.id, question, tooltip, props.calcID];
    dispatch({type: `PUT_ADMIN_SUB_QUESTION`, payload: id});
  }

  return(
    <>
      <textarea 
        rows="6" 
        cols="30" 
        value={question} 
        onChange={(event)=>setQuestion(event.target.value)} 
      />
      <textarea 
        rows="6" 
        cols="30" 
        value={tooltip} 
        onChange={(event)=>setTooltip(event.target.value)}
      />
      <button onClick={handleSave}>SAVE</button>
    </>
  );
}