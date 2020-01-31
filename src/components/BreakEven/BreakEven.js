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
  const [sales, setSales] = useState('');

  useEffect(()=>{
    if(type === 'total'){
      if(hours && rate && raw && part && indirect && sales){
        setPrice((hours*rate+raw+part+indirect)/sales)
      }
    } else {
      if(hours && rate && raw && part && indirect ){
        setPrice(hours*rate+raw+part+indirect);
      }
    }
  },[hours, rate, raw, part, indirect, setPrice, type, sales])

  return (
    <div className='break-even'>
      <form>
        <input 
          type="radio" 
          name="type" 
          value="single"
          checked={type === 'single'}
          onChange={()=>{setType('single'); setSales('')}}
        />
        Single Sale
        <br/>
        <input 
          type="radio" 
          name="type" 
          value="total"
          checked={type === 'total'}
          onChange={()=>setType('total')}
        />
        Total Product
        <br/>
        hours
        <br/>
        <input type='number' value={hours} onChange={(event)=>{setHours( Number(event.target.value))}}/>
        <br/>
        labor rate
        <br/>
        <input type='number' value={rate} onChange={(event)=>{setRate(Number(event.target.value))}}/>
        <br/>
        Cost of raw materials
        <br/>
        <input type='number' value={raw} onChange={(event)=>{setRaw(Number(event.target.value))}}/>
        <br/>
        Cost of parts
        <br/>
        <input type='number' value={part} onChange={(event)=>{setPart(Number(event.target.value))}}/>
        <br/>
        Indirect costs
        <br/>
        <input type='number' value={indirect} onChange={(event)=>{setIndirect(Number(event.target.value))}}/>
        {
          type==='total'?
            <>
              <br/>
              Number of Sales
              <br/>
              <input type='number' onChange={(event)=>{setSales(Number(event.target.value))}}/>
            </>:
            null
        }
      </form>
      <p>
        You're break even price is {price}.
        <br/>
        You must sell your product at a price higher than {price} to make a profit.
      </p>
    </div>
  );
}

export default BreakEven;
