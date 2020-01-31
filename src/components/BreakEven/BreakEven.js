import React, { useState } from 'react';
import { useEffect } from 'react';
import './BreakEven.css';

function BreakEven() {
  const [price, setPrice] = useState('');
  const [hours, setHours] = useState('');
  const [rate, setRate] = useState('');
  const [raw, setRaw] = useState('');
  const [part, setPart] = useState('');
  const [indirect, setIndirect] = useState('');
  const [type, setType] = useState('single');
  const [sales, setSales] = useState(1);

  useEffect(()=>{
    setPrice((hours*rate+raw+part+indirect)/(sales))
  },[hours, rate, raw, part, indirect, setPrice, type, sales])

  return (
    <center>
      <div className="break-main-container">
      <h1 className="break-main-heading">Break Even Pricing</h1>
        <form>

        <div>
          <label className="break-radio">
            <input 
              type="radio" 
              name="type" 
              value="single"
              checked={type === 'single'}
              onChange={()=>{setType('single'); setSales(1)}}
            />
            Single Sale
          </label>
        </div>
          <br/>
        <div>
          <label className="break-radio">
            <input 
              type="radio" 
              name="type" 
              value="total"
              checked={type === 'total'}
              onChange={()=>setType('total')}
            />
            Total Product
          </label>
        </div>
          <br/>

        <div>
          <span>What are your Labor Hours?</span>
          <div className="break-text-field-container">
            <input 
              className="text-field break-text-field-hours"
              type='number' 
              value={hours} 
              onChange={(event)=>{setHours(event.target.value)}}
            />
            <label className="text-field-label break-label-hours">labor hours</label>
            <div className="text-field-mask break-mask-hours"></div>
          </div>
        </div>

        <div>
          <span>What are your Labor Rates?</span>
          <div className="break-text-field-container">
            <input 
              className="text-field break-text-field-rate"
              type='number' 
              value={rate} 
              onChange={(event)=>{setRate(event.target.value)}}
            />
            <label className="text-field-label break-label-rate">labor rate</label>
            <div className="text-field-mask break-mask-rate"></div>
          </div>
        </div>

        <div>
          <span>How much are the Raw Materials?</span>
          <div className="break-text-field-container">
            <input 
              className="text-field break-text-field-raw-material"
              type='number' 
              value={raw} 
              onChange={(event)=>{setRaw(event.target.value)}}
            />
            <label className="text-field-label break-label-raw-material">raw material costs</label>
            <div className="text-field-mask break-mask-raw-material"></div>
          </div>
        </div>

        <div>
          <span>How much are the Parts?</span>
          <div className="break-text-field-container">
            <input 
              className="text-field break-text-field-part"
              type='number' 
              value={part} 
              onChange={(event)=>{setPart(event.target.value)}}
            />
            <label className="text-field-label break-label-part">part costs</label>
            <div className="text-field-mask break-mask-part"></div>
          </div>
        </div>
          
        <div>
          <span>How much are your Indirect Costs?</span>
          <div className="break-text-field-container">
            <input 
              className="text-field break-text-field-indirect-cost"
              type='number' 
              value={indirect} 
              onChange={(event)=>{setIndirect(event.target.value)}}
            />
            <label className="text-field-label break-label-indirect-cost">indirect costs</label>
            <div className="text-field-mask break-mask-indirect-cost"></div>
          </div>
        </div>
          

          
          {type === 'total' ?
            <div>
              <span>How many Total Sales do you have?</span>
              <div className="break-text-field-container">
                <input 
                  className="text-field break-text-field-sales"
                  type='number' 
                  value={sales} 
                  onChange={(event)=>{setSales(event.target.value)}}
                />
                <label className="text-field-label break-label-sales">number of sales</label>
                <div className="text-field-mask break-mask-sales"></div>
              </div>
            </div>
            :
            null
          }
        </form>
        <div className="lever-result">
          <h3 className="lever-result-heading">Result</h3>
          <p>You're break even price is {price.toLocaleString("en-US", {style: "currency", currency: 'USD'})}.</p>
          <br />
          <p>You must sell your product at a price higher than {price.toLocaleString("en-US", {style: "currency", currency: 'USD'})} to make a profit.</p>
        </div>
      </div>
    </center>
  );
}

export default BreakEven;
