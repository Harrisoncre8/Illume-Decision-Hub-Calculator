import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './AdminEditIndustry.css';
import Modal from 'react-awesome-modal';
import Nav from '../Nav/Nav';

export default function AdminEditIndustry() {

  const dispatch = useCallback(useDispatch());
  const history = useHistory();
  const industryList = useSelector(state => state.adminIndustry);
  const [industryName, setIndustryName] = useState('');
  const [newGrossMargin, setNewGrossMargin] = useState('');
  const [newIndustry, setNewIndustry] = useState('');
  const [newOpMargin, setNewOpMargin] = useState('');
  const [selectedGrossMargin, setSelectedGrossMargin] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedOpMargin, setSelectedOpMargin] = useState('');
  const [visible, setVisible] = useState(false);

  // Run on component mount
  useEffect(()=>{
    dispatch({type: `GET_ADMIN_INDUSTRY`});
  }, [dispatch]);


  // Add class if input has a value, removes the class if input has no value
  const checkForValue = e => e.target.value ? e.target.classList.add('text-field-active') : e.target.classList.remove('text-field-active');

  // Close modal popup
  const closeModal = () => setVisible(false);

  // Ask for confirmation, then dispatch DELETE request to saga
  const handleDelete = id => {
    let popup = window.confirm(`Are you sure you want to disable ${id.industry}?`);
    if(popup){
      dispatch({type: `DELETE_ADMIN_INDUSTRY_INFO`, payload: id.id});
    }
  }


  // Dispatch new industry to saga
  const handlePost = e => {
    e.preventDefault();
    dispatch({type: `POST_ADMIN_INDUSTRY_INFO`, payload: {newGrossMargin, newIndustry, newOpMargin}});
    closeModal();
  }

  // Dispatch edited industry to saga
  const handleSave = e => {
    e.preventDefault();
    dispatch({type: `PUT_ADMIN_INDUSTRY_INFO`, payload: {selectedGrossMargin, selectedId, selectedIndustry, selectedOpMargin}});
    closeModal();
  }

  // Open modal popup, populate inputs with selected industry data from local state
  const openModal = industry => {
    if(!industry.target){
      setVisible(true);
      setIndustryName(industry.industry);
      setSelectedGrossMargin(industry.gross_margin*100);
      setSelectedId(industry.id);
      setSelectedIndustry(industry.industry);
      setSelectedOpMargin(industry.op_margin*100);
    }
    else {
      setVisible(true);
    }
  }

  // Return to admin page
  const pushHistoryBack = () => history.push('/admin');

  return(
    <center>
      <Nav />
      <div className="main-container">
        <div className="top-card-container">
          <button className="close-window-button" onClick={pushHistoryBack}>x</button>
          <h1 className="main-heading admin-industry-heading">Industry Information</h1> 
          <button className="normal-btn admin-industry-add-btn" onClick={openModal}>Add New Industry</button>
          <table className="admin-industry-table">
            <thead>
              <tr>
                <th>Industry</th>
                <th>Gross Margin</th>
                <th className="op-margin-cell-width">Operating Margin</th>
                <th>Enabled?</th>
                <th></th>
                <th className="edit-info-cell-width"></th>
              </tr>
            </thead>
            <tbody>
              {industryList.map(industry => 
                <tr id={industry.enabled ? '' : "admin-industry-disabled"} key={industry.id}>
                  <td>{industry.industry}</td>
                  <td>{(industry.gross_margin * 100).toFixed(0)}%</td>
                  <td className="op-margin-cell-width">{(industry.op_margin * 100).toFixed(0)}%</td>
                  {industry.enabled ?
                    <>
                      <td>Yes</td>
                      <td 
                        className="admin-delete-industry-cell" 
                        onClick={()=>handleDelete(industry)}
                      >
                        DISABLE
                      </td>
                    </>
                    :
                    <>
                      <td>No</td>
                      <td 
                        className="admin-delete-industry-cell" 
                        onClick={()=>handleDelete(industry)}
                      >
                        ENABLE
                      </td>
                    </>
                  }
                  <td 
                    className="admin-edit-industry-cell edit-info-cell-width" 
                    onClick={()=>openModal(industry)}
                  >
                    Edit Info
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <Modal 
            visible={visible}
            width="440"
            height="500"
            effect="fadeInUp"
            onClickAway={closeModal}
          >
            {industryName ? 
              <div className="modal-container">
                <button className="close-window-button" onClick={closeModal}>x</button>
                <h1 className="main-heading modal-heading">{industryName}</h1>
                
                <form onSubmit={handleSave}>
                  <div className="text-field-container">
                    <input 
                      className="text-field text-field-active" 
                      type="text" 
                      value={selectedIndustry}
                      onChange={(e)=>{
                                    setSelectedIndustry(e.target.value);
                                    checkForValue(e);
                                  }
                                }
                    />
                    <label className="text-field-label">industry</label>
                    <div className="text-field-mask admin-industry-mask-industry"></div>
                  </div>

                  <div className="text-field-container">
                    <input 
                      className="text-field text-field-active" 
                      type="text" 
                      value={selectedGrossMargin} 
                      onChange={(e)=>{
                                    setSelectedGrossMargin(e.target.value);
                                    checkForValue(e);
                                  }
                                }
                    />
                    <label className="text-field-label">gross margin (%)</label>
                    <div className="text-field-mask admin-industry-mask-gross-margin"></div>
                  </div>

                  <div className="text-field-container">
                    <input 
                      className="text-field text-field-active" 
                      type="text" 
                      value={selectedOpMargin} 
                      onChange={(e)=>{
                                    setSelectedOpMargin(e.target.value);
                                    checkForValue(e);
                                  }
                                }
                    />
                    <label className="text-field-label">operating margin (%)</label>
                    <div className="text-field-mask admin-industry-mask-op-margin"></div>
                  </div>

                  <div className="modal-btn-container">
                    <button className="normal-btn" type="submit">Save</button>
                  </div>
                </form>
              </div>

              :

              <div className="modal-container">
                <button className="close-window-button" onClick={closeModal}>x</button>
                <h1 className="main-heading modal-heading">Add New Industry</h1>
                
                <form onSubmit={handlePost}>
                  <div className="text-field-container">
                    <input 
                      className="text-field" 
                      type="text" 
                      value={newIndustry}
                      onChange={(e)=>{
                                    setNewIndustry(e.target.value);
                                    checkForValue(e);
                                  }
                                }
                    />
                    <label className="text-field-label">industry</label>
                    <div className="text-field-mask admin-industry-mask-industry"></div>
                  </div>

                  <div className="text-field-container">
                    <input 
                      className="text-field" 
                      type="text" 
                      value={newGrossMargin} 
                      onChange={(e)=>{
                                    setNewGrossMargin(e.target.value);
                                    checkForValue(e);
                                  }
                                }
                    />
                    <label className="text-field-label">gross margin (%)</label>
                    <div className="text-field-mask admin-industry-mask-gross-margin"></div>
                  </div>

                  <div className="text-field-container">
                    <input 
                      className="text-field" 
                      type="text" 
                      value={newOpMargin} 
                      onChange={(e)=>{
                                    setNewOpMargin(e.target.value);
                                    checkForValue(e);
                                  }
                                }
                    />
                    <label className="text-field-label">operating margin (%)</label>
                    <div className="text-field-mask admin-industry-mask-op-margin"></div>
                  </div>

                  <div className="modal-btn-container">
                    <button className="normal-btn" type="submit">Add New</button>
                  </div>
                </form>

              </div>
            }
          </Modal>

        </div>
      </div>
    </center>
  );
}