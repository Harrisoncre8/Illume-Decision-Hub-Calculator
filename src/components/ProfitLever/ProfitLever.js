import React, { useState } from 'react';
import { useEffect } from 'react';
import './ProfitLever.css';

function ProfitLever() {

  const [revenue, setRevenue] = useState('');
  const [directCost, setDirectCost] = useState('');
  const [indirectCost, setIndirectCost] = useState('');
  const [price, setPrice] = useState(0);
  const [growth, setGrowth] = useState(0);
  const [directCostChange, setDirectCostChange] = useState(0);
  const [indirectCostChange, setIndirectCostChange] = useState(0);

  useEffect(()=>{
    if(revenue !== '' && directCost !== '' && indirectCost !== ''){
      setPrice((((revenue * 1.01 - directCost - indirectCost)/(revenue - directCost - indirectCost))-1)*100);
      setGrowth(((((revenue * 1.01 - (directCost / revenue) * revenue * 1.01) - indirectCost)/(revenue - directCost - indirectCost))-1)*100);
      setDirectCostChange((((revenue - (directCost * .99) - indirectCost)/(revenue - directCost - indirectCost))-1)*100);
      setIndirectCostChange((((revenue - directCost - (indirectCost * .99))/(revenue - directCost - indirectCost))-1)*100);
    }
  },[revenue, directCost, indirectCost]);

  return (

    // place radio buttons here for users to change total products and single unit
    // just single unit right now
    
    <center>
      <div className="profit-lever-container">
        <h1 className="lever-main-heading">Define Profit Levers</h1>
          <form>
            <div>
              <span>What are your Direct Costs?</span>
                <div className="lever-text-field-container">
                <label className="lever-label-direct-cost">direct costs</label>
                  <input 
                    className="text-field lever-text-field-direct-cost" 
                    type="number" 
                    value={directCost}
                    onChange={(event)=>setDirectCost(event.target.value)} 
                  />
                  {/* <div className="text-field-mask lever-mask-direct-cost"></div> */}
                </div>
            </div>

            <div>
              <span>What are your Indirect Costs?</span>
                <div className="lever-text-field-container">
                  <input 
                    className="text-field lever-text-field-indirect-cost" 
                    type="number"
                    value={indirectCost}
                    onChange={(event)=>setIndirectCost(event.target.value)}
                    />
                  <label className="lever-label-indirect-cost">indirect costs</label>
                  {/* <div className="text-field-mask lever-mask-indirect-cost"></div> */}
                </div>
            </div>

            <div>
              <span>What is your Revenue?</span>
                <div className="lever-text-field-container">
                  <input 
                    className="text-field lever-text-field-revenue" 
                    type="number" 
                    value={revenue}
                    onChange={(event)=>setRevenue(event.target.value)}
                  />
                  <label className="lever-label-revenue">revenue</label>
                  {/* <div className="text-field-mask lever-mask-revenue"></div> */}
                </div>
            </div>

          </form>
        <div className="lever-result">
          <h3 className="lever-result-heading">Result</h3>
          <p>A 1% improvement in price will deliver {price.toFixed(1)}% improvement in profit.</p> 
          {/* <p>This translates to $x more profit in your pocket per year</p> */}
          <br />
          <p>A 1% increase in sales will deliver {growth.toFixed(1)}% improvement in profit.</p>
          {/* <p>This translate into $x more profit in your pocket per year</p> */}
          <br />
          <p>A 1% reduction in direct cost will deliver {directCostChange.toFixed(1)}% improvement in profit.</p>
          {/* <p>This translates into $x more profit in your pocket per year</p> */}
          <br />
          <p>A 1% reduction in indirect costs will deliver {indirectCostChange.toFixed(1)}% improvement in profit.</p>
          {/* <p>This translates into $x more profit in your pocket each year</p> */}
        </div>
      </div>
    </center>
  );
}

export default ProfitLever;