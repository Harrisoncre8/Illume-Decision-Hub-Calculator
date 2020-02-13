import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './UserCalcToggle.css';

const UserCalcToggle = () => {

  // getting data from reducer
  const dispatch = useDispatch();
  const userID = useSelector(state => state.user.id);
  const calcData = useSelector(state => state.calcStatus);

  useEffect(() => {
    if(userID){
      dispatch({type: `GET_CALC_INFO`, payload: userID});
    }
  }, [userID, dispatch]);

  // handle button click to toggle nav 
  const handleCalcClick = calcID => {
    let calcInfo = {userID, calcID};
    if(calcData[calcData.findIndex(element => element.calculator_id === calcID)]){
      dispatch({type: `DELETE_CALC`, payload: calcInfo});
    } 
    else {
      dispatch({type: `TOGGLE_CALC`, payload: calcInfo});
    }
  }

  // handle button class change based on calculator toggle
  const getButtonClass = calcID => {
    let calcExist = calcData[calcData.findIndex(element => element.calculator_id === calcID)];
    if(calcExist && calcExist.calculator_id === calcID){
      return `circle-btn circle-btn-disabled`;
    } 
    else {
      return `circle-btn`;
    }
  }

  return(
    <div>
      <h2>Toggle Your Calculators</h2>
      <p>* Select a calculator to turn on and off</p>
      <p>* Disabled calculators will appear grey</p>
      <div className="toggle-btn-main-container">
        <span className="toggle-btn-container">
          <button className={getButtonClass(1)} onClick={() => handleCalcClick(1)}>
            Profit Lever Calculator
          </button>
        </span>
        <span className="toggle-btn-container">
        <button className={getButtonClass(2)} onClick={() => handleCalcClick(2)}>
          Break even Calculator
        </button>
        </span>
        <span className="toggle-btn-container">
        <button className={getButtonClass(3)} onClick={() => handleCalcClick(3)}>
          Price Setting Calculator
        </button>
        </span>
      </div>
    </div>
  );
}

export default UserCalcToggle;