import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import './ExploreMore.css'

const ExploreMore = () => {
  // References for masks to dynamically get width of label
  const revLabel = useRef(null);
  const salesLabel = useRef(null);
  const directLabel = useRef(null);
  const indirectLabel = useRef(null);

  // States to hold stepper input values
  const [revenue, setRevenue] = useState();
  const [directCost, setDirectCost] = useState();
  const [indirectCost, setIndirectCost] = useState();
  const [sales, setSales] = useState();

  // States to hold testing input values
  const [newRevenue, setNewRevenue] = useState(.01);
  const [newSales, setNewSales] = useState(.01);
  const [newDirectCost, setNewDirectCost] = useState(.01);
  const [newIndirectCost, setNewIndirectCost] = useState(.01);

  // States to hold toggles
  const [revIncrease, setRevIncrease] = useState(true);
  const [salesIncrease, setSalesIncrease] = useState(true);
  const [directIncrease, setDirectIncrease] = useState(false);
  const [indirectIncrease, setIndirectIncrease] = useState(false);
  const [dollarToggle, setDollarToggle] = useState(false);

  // States to hold math results
  const [revChange, setRevChange] = useState('')
  const [salesChange, setSalesChange] = useState('')
  const [directChange, setDirectChange] = useState('')
  const [indirectChange, setIndirectChange] = useState('')

  // Brings in input values
  const inputData = useSelector(state => state.input);

  // Checks for text in a field and freezes lable if text exists
  const checkForValue = e => e.target.value ? e.target.classList.add('text-field-active') : e.target.classList.remove('text-field-active');

  // Sets stepper input fields
  useEffect(() => {
    setRevenue(inputData[2]/(+inputData[5] || 1) || 0);
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

  // Does the math
  useEffect(()=>{
    let profit = revenue - directCost/sales - indirectCost/sales
    if(dollarToggle){

    } else {
      setRevChange(
        (
          (
            (revenue * (revIncrease? 1 + newRevenue: 1 - newRevenue) - directCost/sales - indirectCost/sales)/
            profit - 1
          ) * profit * sales
        ).toFixed(2)
      );
      setSalesChange(
        (
          (
            ((revenue - directCost/sales) * (salesIncrease? 1 + newSales: 1 - newSales) - indirectCost/sales)/
            profit - 1
          ) * profit * sales * (salesIncrease? 1 + newSales: 1 - newSales)
        ).toFixed(2)
      );
      setDirectChange(
        (
          (
            (revenue - directCost/sales * (directIncrease? 1 + newDirectCost: 1 - newDirectCost)  - indirectCost/sales)/
            profit - 1
          ) * profit * sales
        ).toFixed(2)
      );
      setIndirectChange(
        (
          (
            (revenue - directCost/sales - indirectCost/sales * (indirectIncrease? 1 + newIndirectCost: 1 - newIndirectCost))/
            profit - 1
          ) * profit * sales
        ).toFixed(2)
      );
    }
  },
  [
    newRevenue,
    newDirectCost,
    newIndirectCost,
    newSales,
    revIncrease,
    salesIncrease,
    directIncrease,
    indirectIncrease,
    revenue,
    directCost,
    indirectCost,
    sales,
    dollarToggle
  ])

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
            <label className="text-field-label" ref={revLabel}>Price</label>
            <div className="text-field-mask" style={{ width: revLabel.current && revLabel.current.clientWidth + 3.4 }}></div>
          </div>
          <div className="text-field-container" >
            <input
              className="text-field text-field-active"
              value={sales}
              disabled
            />
            <label className="text-field-label" ref={salesLabel}>Sales</label>
            <div className="text-field-mask" style={{ width: salesLabel.current && salesLabel.current.clientWidth + 3.4 }}></div>
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
              <input type="checkbox" checked={revIncrease} onChange={()=>setRevIncrease(!revIncrease)} />
              <span class="slider round"></span>
            </label>
          </div>
          <div style={{ height: 51.6, display: 'flex', alignItems: 'center' }}>
            <label class="switch">
            <input type="checkbox" checked={salesIncrease} onChange={()=>setSalesIncrease(!salesIncrease)} />
              <span class="slider round"></span>
            </label>
          </div>
          <div style={{ height: 51.6, display: 'flex', alignItems: 'center' }}>
            <label class="switch">
            <input type="checkbox" checked={directIncrease} onChange={()=>setDirectIncrease(!directIncrease)} />
              <span class="slider round"></span>
            </label>
          </div>
          <div style={{ height: 51.6, display: 'flex', alignItems: 'center' }}>
            <label class="switch">
            <input type="checkbox" checked={indirectIncrease} onChange={()=>setIndirectIncrease(!indirectIncrease)} />
              <span class="slider round"></span>
            </label>
          </div>
        </div>
        <div style={{ padding: 10, display: 'flex', justifyContent: 'space-around', flexDirection: 'column' }}>
          <div className="text-field-container" >
            <input
              className="text-field text-field-active"
              value={dollarToggle? newRevenue: newRevenue*100}
              type='number'
              onChange={(e)=>{setNewRevenue(dollarToggle? e.target.value: e.target.value/100); checkForValue(e);}}
            />
            <label className="text-field-label">Price</label>
            <div className="text-field-mask" style={{ width: revLabel.current && revLabel.current.clientWidth + 3.4 }}></div>
          </div>
          <div className="text-field-container" >
            <input
              className="text-field text-field-active"
              value={dollarToggle? newSales: newSales*100}
              type='number'
              onChange={(e)=>{setNewSales(dollarToggle? e.target.value: e.target.value/100); checkForValue(e);}}
            />
            <label className="text-field-label">Sales</label>
            <div className="text-field-mask" style={{ width: salesLabel.current && salesLabel.current.clientWidth + 3.4 }}></div>
          </div>
          <div className="text-field-container" >
            <input
              className="text-field text-field-active"
              value={dollarToggle? newDirectCost: newDirectCost*100}
              type='number'
              onChange={(e)=>{setNewDirectCost(dollarToggle? e.target.value: e.target.value/100); checkForValue(e);}}
            />
            <label className="text-field-label">Direct Costs</label>
            <div className="text-field-mask" style={{ width: directLabel.current && directLabel.current.clientWidth + 3.4 }}></div>
          </div>
          <div className="text-field-container" >
            <input
              className="text-field text-field-active"
              value={dollarToggle? newIndirectCost: newIndirectCost*100}
              type='number'
              onChange={(e)=>{setNewIndirectCost(dollarToggle? e.target.value: e.target.value/100); checkForValue(e);}}
            />
            <label className="text-field-label">Indirect Costs</label>
            <div className="text-field-mask" style={{ width: indirectLabel.current && indirectLabel.current.clientWidth + 3.4 }}></div>
          </div>
        </div>
        <div style={{ padding: 10, display: 'flex', justifyContent: 'space-around', flexDirection: 'column' }}>
          <p>{revChange.toLocaleString("en-US", { style: "currency", currency: 'USD' })} {revIncrease? 'increase': 'decrease'} in profits</p>
          <p>{salesChange.toLocaleString("en-US", { style: "currency", currency: 'USD' })} {salesIncrease? 'increase': 'decrease'} in profits</p>
          <p>{directChange.toLocaleString("en-US", { style: "currency", currency: 'USD' })} {directIncrease? 'decrease': 'increase'} in profits</p>
          <p>{indirectChange.toLocaleString("en-US", { style: "currency", currency: 'USD' })} {indirectIncrease? 'decrease': 'increase'} in profits</p>
        </div>
      </div>
    </div>
  )
}

export default ExploreMore;