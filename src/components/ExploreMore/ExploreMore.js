import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import './ExploreMore.css'

const ExploreMore = () => {

  const revLabel = useRef(null);
  const saleLabel = useRef(null);
  const directLabel = useRef(null);
  const indirectLabel = useRef(null);

  const [revenue, setRevenue] = useState();
  const [directCost, setDirectCost] = useState();
  const [indirectCost, setIndirectCost] = useState();
  const [sales, setSales] = useState();

  const [newRevenue, setNewRevenue] = useState();
  const [newDirectCost, setNewDirectCost] = useState();
  const [newIndirectCost, setNewIndirectCost] = useState();
  const [newSales, setNewSales] = useState();

  const inputData = useSelector(state => state.input);

  const checkForValue = e => e.target.value ? e.target.classList.add('text-field-active') : e.target.classList.remove('text-field-active');

  useEffect(() => {
    setRevenue(inputData[2] || 0);
    setDirectCost(
      +inputData[7] === 3 ?
        +inputData[3] || 0 :
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
    setSales(+inputData[1] === 2 ? 1 : +inputData[5] || 1);
  }, [inputData])
  return (
    <div>
      <label class="switch">
        <input type="checkbox" />
        <span class="slider round"></span>
      </label>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ padding: 10, display: 'flex', justifyContent: 'space-around', flexDirection: 'column' }}>
          <div className="text-field-container" >
            <input
              className="text-field text-field-active"
              value={revenue}
              disabled
            />
            <label className="text-field-label" ref={revLabel}>Revenue</label>
            <div className="text-field-mask" style={{ width: revLabel.current && revLabel.current.clientWidth + 3.4 }}></div>
          </div>
          <div className="text-field-container" >
            <input
              className="text-field text-field-active"
              value={sales}
              disabled
            />
            <label className="text-field-label" ref={saleLabel}>Sales</label>
            <div className="text-field-mask" style={{ width: saleLabel.current && saleLabel.current.clientWidth + 3.4 }}></div>
          </div>
          <div className="text-field-container" >
            <input
              className="text-field text-field-active"
              value={directCost}
              disabled
            />
            <label className="text-field-label" ref={directLabel}>Direct Costs</label>
            <div className="text-field-mask" style={{ width: directLabel.current && directLabel.current.clientWidth + 3.4 }}></div>
          </div>
          <div className="text-field-container" >
            <input
              className="text-field text-field-active"
              value={indirectCost}
              disabled
            />
            <label className="text-field-label" ref={indirectLabel}>Indirect Costs</label>
            <div className="text-field-mask" style={{ width: indirectLabel.current && indirectLabel.current.clientWidth + 3.4 }}></div>
          </div>
        </div>
        <div style={{ padding: 10, display: 'flex', justifyContent: 'space-around', flexDirection: 'column' }}>
          <div style={{ height: 51.6, display: 'flex', alignItems: 'center' }}>
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
            </label>
          </div>
          <div style={{ height: 51.6, display: 'flex', alignItems: 'center' }}>
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
            </label>
          </div>
          <div style={{ height: 51.6, display: 'flex', alignItems: 'center' }}>
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
            </label>
          </div>
          <div style={{ height: 51.6, display: 'flex', alignItems: 'center' }}>
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
            </label>
          </div>
        </div>
        <div style={{ padding: 10, display: 'flex', justifyContent: 'space-around', flexDirection: 'column' }}>
          <div className="text-field-container" >
            <input
              className="text-field"
              value={newRevenue}
              onChange={(e)=>{setNewRevenue(e.target.value); checkForValue(e);}}
            />
            <label className="text-field-label">Revenue</label>
            <div className="text-field-mask" style={{ width: revLabel.current && revLabel.current.clientWidth + 3.4 }}></div>
          </div>
          <div className="text-field-container" >
            <input
              className="text-field"
              value={newSales}
              onChange={(e)=>{setNewSales(e.target.value); checkForValue(e);}}
            />
            <label className="text-field-label">Sales</label>
            <div className="text-field-mask" style={{ width: saleLabel.current && saleLabel.current.clientWidth + 3.4 }}></div>
          </div>
          <div className="text-field-container" >
            <input
              className="text-field"
              value={newDirectCost}
              onChange={(e)=>{setNewDirectCost(e.target.value); checkForValue(e);}}
            />
            <label className="text-field-label">Direct Costs</label>
            <div className="text-field-mask" style={{ width: directLabel.current && directLabel.current.clientWidth + 3.4 }}></div>
          </div>
          <div className="text-field-container" >
            <input
              className="text-field"
              value={newIndirectCost}
              onChange={(e)=>{setNewIndirectCost(e.target.value); checkForValue(e);}}
            />
            <label className="text-field-label">Indirect Costs</label>
            <div className="text-field-mask" style={{ width: indirectLabel.current && indirectLabel.current.clientWidth + 3.4 }}></div>
          </div>
        </div>
        <div style={{ padding: 10, display: 'flex', justifyContent: 'space-around', flexDirection: 'column' }}>
          <p>Increase By {''}</p>
          <p>Increase By</p>
          <p>Increase By</p>
          <p>Increase By</p>
        </div>
      </div>
    </div>
  )
}

export default ExploreMore;