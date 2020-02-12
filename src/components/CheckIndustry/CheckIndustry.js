import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function CheckIndustry() {

  const dispatch = useCallback(useDispatch());
  const userData = useSelector(state => state.user.id);
  const [id, setId] = useState('');
  const [industry, setIndustry] = useState('');

  useEffect(()=>{
    if(userID){
      setId(userID);
      dispatch({type: `GET_USER_INFO`, payload: userID});
      dispatch({type: `GET_INDUSTRY`});
    }
  }, [userID]);

  return(
    <>
    </>
  );
}