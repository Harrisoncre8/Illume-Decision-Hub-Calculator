import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';

export default function AdminCalcQuestion(props) {

  const dispatch = useDispatch();
  const [id, setID] = useState(props.id);
  const [question, setQuestion] = useState(props.question);
  const [tooltip, setTooltip] = useState(props.tooltip);

  useEffect(()=>{
    if(id === 3 || id === 4){
      dispatch({type: `GET_ADMIN_SUB_QUESTIONS`, payload: id});
    }
  }, [id]);

  return(
    <>
      <textarea rows="6" cols="30" value={question} onChange={(event)=>setQuestion(event.target.value)} />
      <textarea rows="6" cols="30" value={tooltip} onChange={(event)=>setTooltip(event.target.value)} />
    </>
  );
}