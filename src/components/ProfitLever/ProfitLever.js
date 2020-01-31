import React, { useState } from 'react';
import { useEffect } from 'react';

function ProfitLever() {
  const [revenue, setRevenue] = useState('');
  const [directCost, setDirectCost] = useState('');
  const [indirectCost, setIndirectCost] = useState('');

  return (
    <form>
        Your Direct Costs <input />
        Your Indirect Costs <input />
        Your Revenue <input />
    </form>
  );
}

export default ProfitLever;