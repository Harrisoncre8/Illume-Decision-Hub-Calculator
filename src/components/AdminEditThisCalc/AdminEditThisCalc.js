import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './AdminEditThisCalc.css';
import AdminCalcQuestion from '../AdminCalcQuestion/AdminCalcQuestion';

export default function AdminEditThisCalc(props) {

  const question = useSelector((state)=>state.admin.adminQuestion);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch({type: `GET_ADMIN_QUESTION`, payload: props.calcID});
  }, []);

  return(
    <>
    <div className="main-container">
      <h1 className="main-heading">Edit {props.name} Calculator</h1>
    </div>
    <div>
      {question.map(q =>
        <div className="admin-question-card" key={q.id}>
          <AdminCalcQuestion id={q.id} question={q.question} tooltip={q.help_text} />
        </div>
      )}
    </div>
    </>
  );
}