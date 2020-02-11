import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UserCalcToggle = () => {

  let dispatch = useDispatch();
  let userID = useSelector(state => state.user.id);

  // handle button click to toggle nav 
  const handleCalcClick = calcID => {
    let calcInfo = {userID, calcID}
    dispatch({ type: 'TOGGLE_CALC', payload: calcInfo});
  }

  return(
    <div>
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