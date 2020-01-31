import React, { useState } from 'react';
import { useEffect } from 'react';

function PriceSetting() {
  const [industry, setIndustry] = useState('');
  const [price, setPrice] = useState('');
  const [cost, setCost] = useState('');

  
  return (
    <>
    <div className="inputs">
        <form>
            <select>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
                <option value="G">G</option>
            </select>
        </form>
            <p>Industry Norm:</p>
            <p>Industry Margin:</p>
        <form>
            Product Cost<input />
            Product Price<input />
        </form>
    </div>
    <div className="results">
        <p>If your price is lower than industry norms, you will need to sell *math goes here* more units to make the same margin</p>
        <p>If your price is higher than industry norms, you can sell *math goes here* fewer units</p>
    </div>
    </>
  );
}

export default PriceSetting;