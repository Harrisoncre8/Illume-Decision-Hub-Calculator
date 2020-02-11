import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UserCalcToggle = () => {
  return(
    <div>
      <h2>Toggle Your Calculators</h2>
      <p>* Select a calculator to turn on and off</p>
      <p>* Disabled calculators will be colored out</p>
      <button className={`circle-btn`}>Break even Calculator</button>
      <button className={`circle-btn`}>Profit Lever Calculator</button>
      <button className={`circle-btn`}>Price Setting Calculator</button>
    </div>
  )
}

export default UserCalcToggle;