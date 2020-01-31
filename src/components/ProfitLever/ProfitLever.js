import React, { useState } from 'react';
import { useEffect } from 'react';

function ProfitLever() {
  const [revenue, setRevenue] = useState('');
  const [directCost, setDirectCost] = useState('');
  const [indirectCost, setIndirectCost] = useState('');

  return (
    <form>
      <div>
        <span>Your Direct Costs</span>
          <input className="text-field lever-text-field-email" type="text" />
          <label className="lever-label-email">direct costs</label>
          <div className="text-field-mask lever-email-mask"></div>
      </div>

        Your Indirect Costs <input />


        Your Revenue <input />

    </form>
  );
}

export default ProfitLever;