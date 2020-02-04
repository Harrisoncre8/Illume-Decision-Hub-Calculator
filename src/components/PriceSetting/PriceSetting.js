import React, { useState } from 'react';
import { useEffect } from 'react';
import './PriceSetting.css';

function PriceSetting() {
  const [margin, setMargin] = useState(.15);
  const [userMargin, setUserMargin] = useState(0);
  const [productMargin, setProductMargin] = useState(0);
  const [price, setPrice] = useState('');
  const [cost, setCost] = useState('');
  const [industryNorm, setIndustryNorm] = useState(0);
  const [difference, setDifference] = useState(0);

  // Adds class if input has a value, removes the class if input has no value
  const checkForValue = e => e.target.value ? e.target.classList.add('text-field-active') : e.target.classList.remove('text-field-active');
  
  // Sets local state to current input value, adds or removes class based on input's value
  const handleChange = (e, propName) => {
    propName(e.target.value);
    checkForValue(e);
  }

  useEffect(()=>{
    let iNorm = cost/(1-margin)
    let pm = iNorm-cost;
    let um = price-cost;
    setIndustryNorm(iNorm);
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
      <div className="main-container">
        <h1 className="main-heading">Price Setting</h1>
        <div className="inputs"> 
          <form>
            <select onChange={(event)=>handleChange(event, setMargin)} defaultValue="Select Industry">
              <option disabled>Select Industry</option>
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
                onChange={(event)=>handleChange(event, setCost)}
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
                onChange={(event)=>handleChange(event, setPrice)}
              />
              <label className="text-field-label price-label-product-price">product price</label>
              <div className="text-field-mask price-mask-product-price"></div>
            </div>
          </form>
        </div>

        <div className="data-result">
          <h3 className="data-result-heading">Result</h3>

          <br />
          <p>Your Margin: ${userMargin} per unit</p>
          <br />
          <p>Industry Norm: ${industryNorm.toFixed(2)} per unit</p>
          <br />
          <p>Industry Margin: ${productMargin.toFixed(2)} per unit</p>
          <br />

          <p>Your price is {productMargin > userMargin ? 'lower': 'higher'} than industry norms<br/> You will need to sell {difference.toFixed(1)} times {productMargin > userMargin ? 'more' : 'less'} units to make the same margin</p>
        </div>
      </div>
    </center>
  );
}

export default PriceSetting;