import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-awesome-modal';
import './User.css';

export default function User(){
// hooks for redux and sagas
let dispatch = useDispatch();
let industryData = useSelector(state => state.industry);
let userData = useSelector(state => state.userInfo);
let userID = useSelector(state => state.user.id);

// setting state for modal
const [modal, setModal] = useState(false);
const [passwordModal, setPasswordModal] = useState(false);

// setting state for user information
const [company, setCompany] = useState('');
const [email, setEmail] = useState('');
const [id, setId] = useState('');
const [industry, setIndustry] = useState('');
const [industryID, setIndustryID] = useState('');
const [name, setName] = useState('');
const [phone, setPhone] = useState('');

// on page load, get user and industry info and set state to userID
useEffect(() => {
  if(userID){
    setId(userID);
    dispatch({type: `GET_USER_INFO`, payload: userID});
    dispatch({type: `GET_INDUSTRY`});
  }
}, [userID, dispatch]);

// change state to open user info modal and set default info to the modal
const openModal = () => {
  setModal(true);
  setIndustry(userData[0].industry);
  setName(userData[0].name);
  setCompany(userData[0].business_name);
  setPhone(userData[0].phone_number);
  setEmail(userData[0].email);
  setIndustryID(userData[0].industry_id);
}
// change state to close user info modal
const closeModal = () => {
    setModal(false);
  }

// save user info changes and sends to DB
const saveChanges = () => {
  let userInfo = {id, name, company, phone, email, industryID};
  dispatch({type: `PUT_USER_INFO`, payload: userInfo});
  setModal(false);
}

// opens modal to change password
const openPassModal = () => {
  setPasswordModal(true);
}
// close modal to change password
const closePassModal = () => {
  setPasswordModal(false);
}

// handle change for industry drop down
const handleUserIndustry = (event) => {
  setIndustry(event.target.value);
  setIndustryID(industryData[industryData.findIndex(el => el.industry === event.target.value)] &&
  industryData[industryData.findIndex(el => el.industry === event.target.value)].id);  
}

  return(
    <center>
      <div className='main-container'>
        {userData.map((user, i) => 
          <ul className='user-info' key={i}>
            <h1 className='user-spacing'>Welcome back, {user.name}</h1>
            <h2 className='user-spacing'>Profile Information</h2>
            <li>Name: {user.name}</li>
            <li>Comapny: {user.business_name}</li>
            <li>Phone: {user.phone_number}</li>
            <li>Email: {user.email}</li>
            <li className='user-spacing'>Industry: {user.industry}</li>
          </ul>
        )}
        <input type="button" value="Edit Profile" onClick={() => openModal()} />
        <Modal
          visible={modal}
          width="400"
          height="300"
          effect="fadeInUp"
          onClickAway={() => closeModal()}
        >
          <h1 className="main-heading admin-user-heading">Edit User Information</h1>
            {userData.map((user, i) => 
              <div key={i}>
                <input value={name} placeholder={user.name}
                 onChange={(event) => setName(event.target.value)}></input>
                <input value={company} placeholder={user.business_name} 
                 onChange={(event) => setCompany(event.target.value)}></input>
                <input value={phone} placeholder={user.phone_number}
                 onChange={(event) => setPhone(event.target.value)}></input>
                <input value={email} placeholder={user.email}
                 onChange={(event) => setEmail(event.target.value)}></input>
              </div>
            )}
            <select className="modal-input"  value={industry} 
             onChange={(event) => handleUserIndustry(event)}>
              {industryData.map((item, i) => 
                    <option>{item.industry}</option>
              )}
            </select>
            <input type="button" value="Change Password?" onClick={openPassModal}></input>
            <div className="modal-btn-container">
              <button className="normal-btn" href="javascript:void(0);" 
                onClick={saveChanges}>Save</button>
              <button className="normal-btn" href="javascript:void(0);" 
              onClick={closeModal}>Cancel</button>
            </div>
        </Modal>

          <Modal
          visible={passwordModal}
          width="400"
          height="300"
          effect="fadeInUp"
          onClickAway={closePassModal}
        >
          <h1 className="main-heading admin-user-heading">Please Confirm New Password</h1>
            <div className="modal-btn-container">
              <button className="normal-btn" href="javascript:void(0);" 
              onClick={closePassModal}>Close</button>
            </div>
        </Modal>
      </div>
    </center>
  );
}