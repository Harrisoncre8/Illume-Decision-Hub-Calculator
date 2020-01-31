import React, { useState } from 'react';
import { useEffect } from 'react';
import './PriceSetting.css';

function PriceSetting() {
  const [margin, setMargin] = useState(.15);
  const [userMargin, setUserMargin] = useState('');
  const [productMargin, setProductMargin] = useState('');
  const [price, setPrice] = useState('');
  const [cost, setCost] = useState('');
  const [industryNorm, setIndustryNorm] = useState('');
  const [difference, setDifference] = useState(0);

  useEffect(()=>{
    let pm = (cost/margin)*margin;
    let um = price-cost;
    setIndustryNorm(cost/margin);
    setProductMargin(pm);
    setUserMargin(um);
    if (pm >= um){
        setDifference(pm/um || 0);
    }else if(pm < um){
        setDifference(um/pm || 0);
    }
  },[margin, price, cost, productMargin, userMargin])

  return (
    <center>
      <div className="price-main-container">
        <h1 className="price-main-heading">Price Setting</h1>
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

          <form>
            <span>What does it cost to make your product?</span>
            <div className="price-text-field-container">
              <input 
                className="text-field price-text-field-product-cost"
                type='number' 
                value={cost} 
                onChange={(event)=>{setCost(event.target.value)}}
              />
              <label className="text-field-label price-label-product-cost">product cost</label>
              <div className="text-field-mask price-mask-product-cost"></div>
            </div>

            <span>What are you pricing your product at?</span>
            <div className="price-text-field-container">
              <input 
                className="text-field price-text-field-product-price"
                type='number'
                value={price} 
                onChange={(event)=>{setPrice(event.target.value)}}
              />
              <label className="text-field-label price-label-product-price">product price</label>
              <div className="text-field-mask price-mask-product-price"></div>
            </div>
          </form>
        </div>

        <div className="price-result">
          <h3 className="price-result-heading">Result</h3>

          <br />
          <p>Your Margin: ${userMargin} per unit</p>
          <br />
          <p>Industry Norm: ${industryNorm} per unit</p>
          <br />
          <p>Industry Margin: ${productMargin} per unit</p>
          <br />

          <p>Your price is {productMargin > userMargin ? 'lower': 'higher'} than industry norms<br/> You will need to sell {difference.toFixed(1)} times {productMargin > userMargin ? 'more' : 'less'} units to make the same margin</p>
        </div>
      </div>
    </center>
  );
}

export default PriceSetting;