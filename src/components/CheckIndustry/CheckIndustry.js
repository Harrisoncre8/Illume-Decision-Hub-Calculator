import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function CheckIndustry() {

  // Store states
  const dispatch = useCallback(useDispatch());
  const industryData = useSelector(state => state.industry);
  const userData = useSelector(state => state.user.id);
  const [id, setId] = useState('');
  const [industry, setIndustry] = useState('');
  const [modal, setModal] = useState(false);

  // Run on component mount
  useEffect(()=>{
    if(userID){
      setId(userID);
      dispatch({type: `GET_USER_INFO`, payload: userID});
      dispatch({type: `GET_INDUSTRY`});
    }
  }, [userID]);

  // Open Modal if industry was disabled
  useEffect(()=>{
    if(!userData[0].enabled){
      openModal();
    }
  }, []);

  // Close modal popup
  const closeModal = () => setModal(false);

  // Open modal popup
  const openModal = () => setModal(true);

  saveChanges = () => {

  }

  return(
    <Modal
      visible={modal}
      width="400"
      height="480"
      effect="fadeInUp"
    >
      <div className="modal-container">
        {JSON.stringify(industry)}
        <h1 className="main-heading">Update Industry</h1>
        <p>Your industry has been removed.</p>
        <p>Please select a new one.</p>
        <select 
          className="modal-input"  
          value={industry}
          onChange={(e)=>setIndustry(e.target.value)}
        > 
          <option value='' disabled>Select Industry</option>
          {industryData.map(industry => 
            <option key={industry.id} value={industry.industry}>{industry.industry}</option>
          )}
        </select>
        <div className="modal-btn-container">
          <button className="normal-btn" onClick={saveChanges}>
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
}