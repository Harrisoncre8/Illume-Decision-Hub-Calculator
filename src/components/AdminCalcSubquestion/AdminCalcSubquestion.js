import React, {useState} from 'react';

export default function AdminCalcSubquestion(props) {

  return(
    <>
      <textarea rows="6" cols="30" value={q.question} onChange={(event)=>setQuestion(event.target.value)} />
    </>
  );
}