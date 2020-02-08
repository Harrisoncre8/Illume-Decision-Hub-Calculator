import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import '../AdminEditCalc/AdminEditCalc.css';
import AdminCalcSubquestion from '../AdminCalcSubquestion/AdminCalcSubquestion';

export default function AdminCalcQuestion(props) {

  const subQuestion = useSelector((state)=>state.admin.adminSubquestion);
  const dispatch = useCallback(useDispatch(), []);
  const [question, setQuestion] = useState(props.question);
  const [tooltip, setTooltip] = useState(props.tooltip);

  // Runs when component mounts
  useEffect(()=>{
    if(props.id === 3 || props.id === 4){
      dispatch({type: `GET_ADMIN_SUB_QUESTION`, payload: props.id});
    }
  }, [props.id]);

  // Dispatch to saga to update question and tooltip in database
  const handleSubmit = e => {
    e.preventDefault();
    let id = [props.id, question, tooltip, props.calcID];
    dispatch({type: `PUT_ADMIN_QUESTION`, payload: id});
  }

  // Map through sub-questions, increment question number for each question
  const subMap = () => {
    let count = 1;
    return (
      props.id === 3 || props.id === 4 ?
        subQuestion.map(q=>
          <div key={q.id}>
            <h3 className="main-heading admin-calc-sub-heading">Sub-Question {count++}</h3>
            <AdminCalcSubquestion id={q.id} question={q.question} tooltip={q.help_text} calcID={props.calcID} />
          </div>
        )
        :
        ''
    );
  }

  return(
    <>
      <form onSubmit={handleSubmit}>
        <div className="admin-calc-question-label">Question:</div>
        <textarea 
          className="admin-calc-question-textfield"
          rows="6" 
          cols="30" 
          value={question} 
          onChange={(event)=>setQuestion(event.target.value)} 
          placeholder="enter question"
        />
        <div  className="admin-calc-tooltip-label">Tooltip:</div>
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
      <div>
        {subMap()}
      </div>
    </>
  );
}