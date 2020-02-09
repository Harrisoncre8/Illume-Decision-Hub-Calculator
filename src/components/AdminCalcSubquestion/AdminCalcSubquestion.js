import React, {useState, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import '../AdminEditCalc/AdminEditCalc.css';

export default function AdminCalcSubquestion(props) {

  const dispatch = useCallback(useDispatch(), []);
  const [question, setQuestion] = useState(props.question);
  const [tooltip, setTooltip] = useState(props.tooltip);
  // const [show, setShow]

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
      <div>
        <button className="normal-btn admin-edit-calc-btn" onClick={handleSave}>SAVE</button>
      </div>
      <hr />
    </>
  );
}