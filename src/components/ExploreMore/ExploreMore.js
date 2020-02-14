import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './ExploreMore.css'

const ExploreMore = ()=>{

  const [revenue, setRevenue]=useState();
  const [directCost, setDirectCost]=useState();
  const [indirectCost, setIndirectCost]=useState();
  const [sales, setSales]=useState();

  const [newRevenue, setNewRevenue]=useState();
  const [newDirectCost, setNewDirectCost]=useState();
  const [newIndirectCost, setNewIndirectCost]=useState();
  const [newSales, setNewSales]=useState();

  const inputData = useSelector(state => state.input);

  useEffect(()=>{
    setRevenue(inputData[2]||0);
    setDirectCost(
      +inputData[7] === 3 ?
        +inputData[3] || 0:
        ((inputData[8] && +inputData[8]['Labor'] || 0) * (inputData[8] && +inputData[8]['Labor2'] || 0)) + 
        (+inputData[9] || 0)
    );
    setIndirectCost(
      +inputData[22] === 4 ?
        +inputData[4] || 0 :
        (+inputData[10] || 0) + (+inputData[11] || 0) + (+inputData[12] || 0) + 
        (+inputData[13] || 0) + (+inputData[14] || 0) + (+inputData[15] || 0) + 
        (+inputData[16] || 0) + (+inputData[17] || 0) + (+inputData[18] || 0) + 
        (+inputData[19] || 0) + (+inputData[20] || 0) + (+inputData[21] || 0) + 
        (+inputData[23] || 0) + (+inputData[24] || 0) + (+inputData[25] || 0)
    );
    setSales( +inputData[1] === 2 ? 1 : +inputData[5] || 1);
  },[inputData])
  return(
    <div>
      <br/>
      <label class="switch">
        <input type="checkbox"/>
        <span class="slider round"></span>
      </label>
      <div style={{display:'flex', justifyContent: 'center'}}>
        <div style={{padding: 10}}>
          <br/>
          <div className="text-field-container" >
            <input
              className="text-field text-field-active"
              value={revenue} 
              disabled
            />
          </div>
          <br/>
          <div className="text-field-container" >
            <input
              className="text-field text-field-active"
              value={sales} 
              disabled
            />
          </div>
          <br/>
          <div className="text-field-container" >
            <input
              className="text-field text-field-active"
              value={directCost} 
              disabled
            />
          </div>
          <br/>
          <div className="text-field-container" >
            <input
              className="text-field text-field-active"
              value={indirectCost} 
              disabled
            />
          </div>
          <br/>
        </div>
        <div style={{padding: 10}}>
          <br/>
          <label class="switch">
            <input type="checkbox"/>
            <span class="slider round"></span>
          </label>
          <br/><br/>
          <label class="switch">
            <input type="checkbox"/>
            <span class="slider round"></span>
          </label>
          <br/><br/>
          <label class="switch">
            <input type="checkbox"/>
            <span class="slider round"></span>
          </label>
          <br/><br/>
          <label class="switch">
            <input type="checkbox"/>
            <span class="slider round"></span>
          </label>
        </div>
        <div style={{padding: 10}}>
          <br/>
          <div className="text-field-container" >
            <input
              className="text-field text-field-active"
              value={newRevenue} 
            />
          </div>
          <br/>
          <div className="text-field-container" >
            <input
              className="text-field text-field-active"
              value={newSales} 
            />
          </div>
          <br/>
          <div className="text-field-container" >
            <input
              className="text-field text-field-active"
              value={newDirectCost} 
            />
          </div>
          <br/>
          <div className="text-field-container" >
            <input
              className="text-field text-field-active"
              value={newIndirectCost} 
            />
          </div>
          <br/>
        </div>
        <div style={{padding: 10}}>
          <br/>
          <p>Increase By {''}</p>
          <br/><br/>
          <p>Increase By</p>
          <br/><br/>
          <p>Increase By</p>
          <br/><br/>
          <p>Increase By</p>
        </div>
      </div>
    </div>
  )
}

export default ExploreMore;