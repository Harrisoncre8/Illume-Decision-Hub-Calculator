import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export default function AdminCalcQuestion(props) {

  const subQuestion = useSelector((state)=>state.admin.adminSubquestion);


  const dispatch = useDispatch();
  const [question, setQuestion] = useState(props.question);
  const [tooltip, setTooltip] = useState(props.tooltip);

  useEffect(()=>{
    if(props.id === 3 || props.id === 4){
      dispatch({type: `GET_ADMIN_SUB_QUESTION`, payload: props.id});
    }
    else if(props.id !== 3 || props.id !== 4){
      dispatch({type: `CLEAR_ADMIN_SUB_QUESTION`});
    }
  }, [props.id]);

  return(
    <>
      {subQuestion.map(q=>
        <textarea rows="6" cols="30" value={q.question} onChange={(event)=>setQuestion(event.target.value)} />
      )}
      <textarea rows="6" cols="30" value={question} onChange={(event)=>setQuestion(event.target.value)} />
      <textarea rows="6" cols="30" value={tooltip} onChange={(event)=>setTooltip(event.target.value)} />
    </>
  );
}