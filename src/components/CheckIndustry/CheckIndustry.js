import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-awesome-modal';

export default function CheckIndustry() {

  // Store states
  const dispatch = useCallback(useDispatch());
  const industryData = useSelector(state => state.industry);
  const userData = useSelector(state => state.userInfo);
  let userID = useSelector(state => state.user.id);
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
    if(userData[0] && !userData[0].enabled){
      openModal();
    }
  }, [userData]);

  // Close modal popup
  const closeModal = () => setModal(false);

  // Open modal popup
  const openModal = () => setModal(true);

  const saveChanges = () => {

  }

  return(
    <center>
      <Modal
        visible={modal}
        width="400"
        height="300"
        effect="fadeInUp"
      >
        <div className="modal-container">
          <h1 className="main-heading">Update Industry</h1>
          <div className="update-industry-p-container">
            <p className="align-left">Your industry has been removed.</p>
            <p className="align-left">Please select a new one.</p>
          </div>
          <select 
            className="dropdown update-industry-select"  
            value={industry}
            onChange={(e)=>setIndustry(e.target.value)}
          > 
            <option value='' disabled>Select Industry</option>
            {industryData.map(industry => 
              <option 
                className="dropdown-option" 
                key={industry.id} 
                value={industry.industry}
              >
                {industry.industry}
              </option>
            )}
          </select>
          <div className="modal-btn-container">
            <button className="normal-btn" onClick={saveChanges}>
              Save
            </button>
          </div>
        </div>
      </Modal>
    </center>
  );
}