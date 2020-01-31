import React, { useState } from 'react';
import { useEffect } from 'react';

function ProfitLever() {
  const [revenue, setRevenue] = useState('');
  const [directCost, setDirectCost] = useState('');
  const [indirectCost, setIndirectCost] = useState('');

  return (
    <form>
        <input type="radio" name="productType" value="single">Single Unit</input>
        <input type="radio" name="productType" value="total">Total Product</input>
        Your Direct Costs <input />
        Your Indirect Costs <input />
        Your Revenue <input />
    </form>
  );
}

export default ProfitLever;