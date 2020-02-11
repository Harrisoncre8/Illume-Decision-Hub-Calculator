import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import './AdminEditCalc.css';
import AdminEditThisCalc from '../AdminEditThisCalc/AdminEditThisCalc';

export default function AdminEditCalc() {

  const history = useHistory();
  const [breakEven, setBreakEven] = useState(false);
  const [lever, setLever] = useState(false);
  const [price, setPrice] = useState(false);
  const handleBreakClick = () => breakEven ? setBreakEven(false) : closeOthers('break');
  const handleLeverClick = () => lever ? setLever(false) : closeOthers('lever');
  const handlePriceClick = () => price ? setPrice(false) : closeOthers('price');
  const pushHistoryBack = () => history.push('/admin');

  const closeOthers = state => {
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
      default:
        break;
    }
  }

  return(
    <center>
      <div className="main-container admin-padding">
        <div className="top-card-container">
        <button className="close-window-button" onClick={pushHistoryBack}>x</button>
        <h1 className="main-heading">Select a Calculator to Edit</h1>
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
      </div>
      {breakEven ?
        <div className="admin-edit-calc-render-container">
          <AdminEditThisCalc calcID={2} name={`Break Even`} />
        </div>
        :
        ''
      }
      {lever ?
        <div className="admin-edit-calc-render-container">
          <AdminEditThisCalc calcID={1} name={`Profit Lever`} />
        </div>
        :
        ''
      }
      {price ?
        <div className="admin-edit-calc-render-container">
          <AdminEditThisCalc calcID={3} name={`Price Setting`} />
        </div>
        :
        ''
      }
    </center>
  );
}