import React, { useState } from 'react';
import { useEffect } from 'react';

function Price() {
  const [price, setPrice] = useState('');
  const [hours, setHours] = useState('');
  const [rate, setRate] = useState('');
  const [raw, setRaw] = useState('');
  const [part, setPart] = useState('');
  const [indirect, setIndirect] = useState('');
  const [type, setType] = useState('single');

  useEffect(()=>{
    if(hours && rate && raw && part && indirect ){
      setPrice(hours*rate+raw+part+indirect);
    }
  },[hours, rate, raw, part, indirect, setPrice])

  return (
    <div>
      <form>
        <input 
          type="radio" 
          name="type" 
          value="single"
          checked={type === 'single'}
          onChange={()=>setType('single')}
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
        hours<input type='number' onChange={(event)=>{setHours( Number(event.target.value))}}/>
        labor rate<input type='number' onChange={(event)=>{setRate(Number(event.target.value))}}/>
        Cost of raw materials<input type='number' onChange={(event)=>{setRaw(Number(event.target.value))}}/>
        Cost of parts<input type='number' onChange={(event)=>{setPart(Number(event.target.value))}}/>
        Indirect costs<input type='number' onChange={(event)=>{setIndirect(Number(event.target.value))}}/>
        {type==='total'? Number of Sales}
      </form>
      <p>
        You're break even price is {price}.
        <br/>
        You must sell your product at a price higher than {price} to make a profit.
      </p>
    </div>
  );
}

export default Price;
