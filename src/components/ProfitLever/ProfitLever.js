import React, { useState } from 'react';
import { useEffect } from 'react';
import './ProfitLever.css';

function ProfitLever() {
  const [revenue, setRevenue] = useState('');
  const [directCost, setDirectCost] = useState('');
  const [indirectCost, setIndirectCost] = useState('');

  return (
    <div className="profit-lever-container">
      <div>
        <form>
          <div>
            <span>What are your Direct Costs?</span>
              <div className="lever-text-field-container">
                <input className="text-field lever-text-field-direct-cost" type="text" />
                <label className="lever-label-direct-cost">direct costs</label>
                <div className="text-field-mask lever-direct-cost-mask"></div>
              </div>
          </div>

          <div>
            <span>What are your Indirect Costs?</span>
              <div className="lever-text-field-container">
                <input className="text-field lever-text-field-indirect-cost" type="text" />
                <label className="lever-label-indirect-cost">indirect costs</label>
                <div className="text-field-mask lever-indirect-cost-mask"></div>
              </div>
          </div>

          <div>
            <span>What is your Revenue?</span>
              <div className="lever-text-field-container">
                <input className="text-field lever-text-field-revenue" type="text" />
                <label className="lever-label-revenue">revenue</label>
                <div className="text-field-mask lever-revenue-mask"></div>
              </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfitLever;