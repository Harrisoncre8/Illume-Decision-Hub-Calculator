import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UserCalcToggle = () => {

  // getting data from reducer
  let dispatch = useDispatch();
  let userID = useSelector(state => state.user.id);
  let calcData = useSelector(state => state.calcStatus);

  // setting state to change button class name
  const [breakEven, setBreakEven] = useState('circle-btn');
  const [lever, setLever] = useState('circle-btn');
  const [price, setPrice] = useState('circle-btn');
  const [calculator, setCalculator] = useState('');

  useEffect(() => {
    if(userID){
      dispatch({type: `GET_CALC_INFO`, payload: userID});
    }
    // if(
    //   calcData[calcData.findIndex(element => element.calculator_id === calculator)] &&
    //   calcData[calcData.findIndex(element => element.calculator_id === calculator)].calculator_id === 1
    // ){
    //   setLever(`circle-btn-active`)
    //   console.log('ASDFASFAFASDFAFASDFAFAS', lever);
    // } else if(calcData[calcData.findIndex(element => element.calculator_id === calculator)] === 2){
    //   setPrice(`circle-btn-active`)
    // } else if(calcData[calcData.findIndex(element => element.calculator_id === calculator)] === 3){
    //   setBreakEven(`circle-btn-active`)
    // }
  }, [userID, dispatch]);

  // handle button click to toggle nav 
  const handleCalcClick = calcID => {
    let calcInfo = {userID, calcID};
    if(calcData[calcData.findIndex(element => element.calculator_id === calcID)]){
      dispatch({type: `DELETE_CALC`, payload: calcInfo});
    } else {
      dispatch({type: `TOGGLE_CALC`, payload: calcInfo});
      setCalculator(calcID);
    }
  }

  return(
    <div>
      {JSON.stringify(calcData)}
      <h2>Toggle Your Calculators</h2>
      <p>* Select a calculator to turn on and off</p>
      <p>* Disabled calculators will be colored out</p>
      <button className={`nav-btn ${lever}`} onClick={() => handleCalcClick(1)}>
        Profit Lever Calculator</button>
      <button className={`nav-btn ${breakEven}`} onClick={() => handleCalcClick(2)}>
        Break even Calculator</button>
      <button className={`nav-btn ${price}`} onClick={() => handleCalcClick(3)}>
        Price Setting Calculator</button>
    </div>
  )
}

export default UserCalcToggle;