import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Slide6() {
  
  const history = useHistory();
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [check5, setCheck5] = useState(false);
  let [count, setCount] = useState(1);

  const inc = () => {
    console.log('in there');
    if(count === 1){
      setCheck1(true);
      setCount(2);
    }
    else if(count === 2){
      setCheck2(true);
      setCount(3);
    }
    else if(count === 3){
      setCheck3(true);
      setCount(4);
    }
    else if(count === 4){
      setCheck4(true);
      setCount(5);
    }
    else if(count === 5){
      setCheck5(true);
      setCount(6);
    }
    else if(count === 6){
      history.push(`/slide3`);
    }
  }

  return(
    <center>
      <div className="list-slide-main-container" onClick={inc}>
        <img className="slide-logo" src="illume-logo180.png" alt="Illume Logo" />
            <span className="slide-heading">illume decision hub</span>

        <ul className="list2-ul">
          <li className="list3-li">
            <label className="checkbox-container">Dynamic information gathering
              <input
                type='checkbox' 
                checked={check1} 
              />
              <span className="checkbox-check"></span>
            </label>
          </li>

          <li className="list3-li">
            <label className="checkbox-container">Conversational language
              <input
                type='checkbox' 
                checked={check2} 
              />
              <span className="checkbox-check"></span>
            </label>
          </li>

          <li className="list3-li">
            <label className="checkbox-container">Prompted consideration
              <input
                type='checkbox' 
                checked={check3} 
              />
              <span className="checkbox-check"></span>
            </label>
          </li>

          <li className="list3-li">
            <label className="checkbox-container">Profit opportunities
              <input
                type='checkbox' 
                checked={check4} 
              />
              <span className="checkbox-check"></span>
            </label>
          </li>

          <li className="list3-li">
            <label className="checkbox-container">Predictive calculations
              <input
                type='checkbox' 
                checked={check5} 
              />
              <span className="checkbox-check"></span>
            </label>
          </li>
        </ul>
      </div>
    </center>
  );
}