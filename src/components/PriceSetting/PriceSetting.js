import React, { useState } from 'react';
import { useEffect } from 'react';

function PriceSetting() {
  const [margin, setMargin] = useState(.15);
  const [userMargin, setUserMargin] = useState('');
  const [productMargin, setProductMargin] = useState('');
  const [price, setPrice] = useState('');
  const [cost, setCost] = useState('');
  const [industryNorm, setIndustryNorm] = useState('');
  const [difference, setDifference] = useState('');

  useEffect(()=>{
    let pm = (cost/margin)*margin;
    let um = price-cost;
    setIndustryNorm(cost/margin);
    setProductMargin(pm);
    setUserMargin(um);
    if (pm >= um){
        setDifference(pm/um);
    }else if(pm < um){
        setDifference(um/pm);
    }
  },[margin, price, cost, productMargin, userMargin])

  return (
    <>
    <div className="inputs">
        <form>
            <select onChange={(event)=>{setMargin( Number(event.target.value))}}>
                <option value={.15}>A</option>
                <option value={.20}>B</option>
                <option value={.25}>C</option>
                <option value={.40}>D</option>
                <option value={.60}>E</option>
                <option value={.80}>F</option>
                <option value={.35}>G</option>
                <option value={.40}>H</option>
                <option value={.55}>I</option>
            </select>
        </form>
            <p>Your Margin: {userMargin}</p>
            <p>Industry Norm: {industryNorm}</p>
            <p>Industry Margin: {productMargin}</p>
        <form>
            Product Cost
                <input 
                    type='number' 
                    value={cost} 
                    onChange={(event)=>{setCost( Number(event.target.value))}}
                />
            Product Price
                <input 
                    type='number' 
                    value={price} 
                    onChange={(event)=>{setPrice( Number(event.target.value))}}
                />
        </form>
    </div>
    <div className="results">
        <p>Your price is {productMargin > userMargin ? 'lower': 'higher'} than industry norms<br/> You will need to sell {difference} times {productMargin > userMargin ? 'more' : 'less'} units to make the same margin</p>
    </div>
    </>
  );
}

export default PriceSetting;