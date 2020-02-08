import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import '../AdminEditCalc/AdminEditCalc.css';
import AdminCalcSubquestion from '../AdminCalcSubquestion/AdminCalcSubquestion';

export default function AdminCalcQuestion(props) {

  const subQuestionFour = useSelector((state)=>state.admin.adminSubquestionFour);
  const subQuestionThree = useSelector((state)=>state.admin.adminSubquestionThree);
  const dispatch = useCallback(useDispatch(), []);
  const [question, setQuestion] = useState(props.question);
  const [tooltip, setTooltip] = useState(props.tooltip);
  const [showSub, setShowSub] = useState(false);

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
  const showSubQuestions = () => {
    let count = 1;
    if(props.id === 3){
      return (
        subQuestionThree.map(q=>
          <div key={q.id}>
            <h3 className="main-heading admin-calc-sub-heading">Sub-Question {count++}</h3>
            <AdminCalcSubquestion id={q.id} question={q.question} tooltip={q.help_text} calcID={props.calcID} />
          </div>
        )
      );
    }
    else if(props.id ===4){ 
      return (
        subQuestionFour.map(q=>
          <div key={q.id}>
            <h3 className="main-heading admin-calc-sub-heading">Sub-Question {count++}</h3>
            <AdminCalcSubquestion id={q.id} question={q.question} tooltip={q.help_text} calcID={props.calcID} />
          </div>
        )
      );
    }
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
      {props.id === 3 || props.id === 4 ?
        <button className="admin-calc-show-hide-btn" onClick={()=>setShowSub(!showSub)}>
          {showSub ?
            <p>Hide Sub-Questions</p>
            :
            <p>Show Sub-Questions</p>
          }
        </button>
        :
        ''
      }
      {showSub ? showSubQuestions() : ''}
    </>
  );
}