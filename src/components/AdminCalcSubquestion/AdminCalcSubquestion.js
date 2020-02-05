import React, {useState} from 'react';

export default function AdminCalcSubquestion(props) {

  const [question, setQuestion] = useState(props.question);
  const [tooltip, setTooltip] = useState(props.tooltip);

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
    </>
  );
}