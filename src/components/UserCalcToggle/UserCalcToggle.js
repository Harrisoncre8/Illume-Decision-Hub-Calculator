import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UserCalcToggle = () => {

  let dispatch = useDispatch();
  let userID = useSelector(state => state.user.id);
  let calcData = useSelector(state => state.calcStatus)

  useEffect(() => {
    if(userID){
      dispatch({type: `GET_CALC_INFO`, payload: userID});
    }
  }, [userID, dispatch]);

  // handle button click to toggle nav 
  const handleCalcClick = calcID => {
    let calcInfo = {userID, calcID};
    if(!calcData[calcData.findIndex(element => element.calculator_id === calcID)]){
      dispatch({type: `TOGGLE_CALC`, payload: calcInfo});
      dispatch({type: `GET_CALC_INFO`, payload: userID});
    } else {
      dispatch({type: `DELETE_CALC`, payload: calcInfo});
    }
  }

  return(
    <div>
      {JSON.stringify(calcData)}
      <h2>Toggle Your Calculators</h2>
      <p>* Select a calculator to turn on and off</p>
      <p>* Disabled calculators will be colored out</p>
      <button className={`circle-btn`} onClick={() => handleCalcClick(1)}>
        Profit Lever Calculator</button>
      <button className={`circle-btn`} onClick={() => handleCalcClick(2)}>
        Break even Calculator</button>
      <button className={`circle-btn`} onClick={() => handleCalcClick(3)}>
        Price Setting Calculator</button>
    </div>
  )
}

export default UserCalcToggle;