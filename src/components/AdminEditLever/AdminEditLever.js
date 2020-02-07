import React, {useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './AdminEditLever.css';
import AdminCalcQuestion from '../AdminCalcQuestion/AdminCalcQuestion';

export default function AdminEditLever() {

  const question = useSelector((state)=>state.admin.adminQuestion);
  const dispatch = useCallback(useDispatch(), []);

  useEffect(()=>{
    dispatch({type: `GET_ADMIN_QUESTION`, payload: 1});
  }, []);

  return(
    <div className="main-container">
      <h1 className="main-heading">Edit Profit Lever Calculator</h1>
      <div>
        <span className="admin-price-q">Question</span>
        <span className="admin-price-tooltip">Tooltip</span>
      </div>
      <div>
        {question.map(q =>
          <div key={q.id}>
            <AdminCalcQuestion id={q.id} question={q.question} tooltip={q.help_text} />
          </div>
        )}
      </div>
    </div>
  );
}