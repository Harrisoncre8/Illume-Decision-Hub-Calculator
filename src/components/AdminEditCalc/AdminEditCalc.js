import React, {useState} from 'react';
import './AdminEditCalc.css';
import AdminEditThisCalc from '../AdminEditThisCalc/AdminEditThisCalc';

export default function AdminEditCalc() {

  const [breakEven, setBreakEven] = useState(false);
  const [lever, setLever] = useState(false);
  const [price, setPrice] = useState(false);

  const handleBreakClick = () => breakEven ? setBreakEven(false) : closeOthers('break');
  const handleLeverClick = () => lever ? setLever(false) : closeOthers('lever');
  const handlePriceClick = () => price ? setPrice(false) : closeOthers('price');

  const closeOthers = (state) => {
    switch (state){
      case 'break':
        setBreakEven(true); 
        setLever(false); 
        setPrice(false);
        break;
      case 'lever':
        setLever(true);
        setBreakEven(false);
        setPrice(false);
        break;
      case 'price':
        setPrice(true);
        setBreakEven(false);
        setLever(false);
        break;
    }
  }

  return(
    <center>
      <div className="main-container admin-padding">
        <div className="admin-button-flex-container">
          <div className="admin-btn-flex-column">
            <button 
              className="circle-btn" 
              onClick={handleBreakClick}
            >
              Edit Break Even
            </button>
          </div>
          <div className="admin-btn-flex-column">
            <button 
              className="circle-btn" 
              onClick={handlePriceClick}
            >
              Edit Price Setting
            </button>
          </div>
          <div className="admin-btn-flex-column">
            <button 
              className="circle-btn" 
              onClick={handleLeverClick}
            >
              Edit Profit Lever
            </button>
          </div>
        </div>
      </div>
        {price ?
          <div className="admin-edit-calc-render-container">
            <AdminEditThisCalc calcID={3} />
          </div>
          :
          ''
        }
        {breakEven ?
          <div className="admin-edit-calc-render-container">
            <AdminEditThisCalc calcID={2} />
          </div>
          :
          ''
        }
        {lever ?
          <div className="admin-edit-calc-render-container">
            <AdminEditThisCalc calcID={1} />
          </div>
          :
          ''
        }
    </center>
  );
}