import React, {useState, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import '../AdminEditCalc/AdminEditCalc.css';

export default function AdminCalcSubquestion(props) {

  const dispatch = useCallback(useDispatch(), []);
  const [question, setQuestion] = useState(props.question);
  const [tooltip, setTooltip] = useState(props.tooltip);

  // Dispatch to saga to update question and tooltip in database
  const handleSubmit = e => {
    e.preventDefault();
    let id = [props.id, question, tooltip, props.calcID];
    dispatch({type: `PUT_ADMIN_SUB_QUESTION`, payload: id});
  }

  return(
    <>
      <form onSubmit={handleSubmit}>
        <div className="admin-calc-question-label">Sub-question:</div>
        <textarea 
          className="admin-calc-question-textfield"
          rows="6" 
          cols="30" 
          value={question} 
          onChange={(event)=>setQuestion(event.target.value)} 
          placeholder="enter sub-question"
        />
        <div className="admin-calc-tooltip-label">Tooltip:</div>
        <textarea 
          rows="6" 
          cols="30" 
          value={tooltip} 
          onChange={(event)=>setTooltip(event.target.value)}
          placeholder="enter tooltip"
        />
        <div>
          <button className="normal-btn admin-edit-calc-btn" type="submit">SAVE</button>
        </div>
      </form>
      <hr />
    </>
  );
}