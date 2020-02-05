import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-awesome-modal';
import './User.css'

export default function User(){
// hooks for redux and sagas
let dispatch = useDispatch();
let industryData = useSelector(state => state.industry.industry);
let userData = useSelector(state => state.userInfo);
// setting state
const [modal, setModal] = useState(false);
const [passwordModal, setPasswordModal] = useState(false);
const [name, setName] = useState('');
const [company, setCompany] = useState('');
const [phone, setPhone] = useState('');
const [email, setEmail] = useState('');
const [industry, setIndustry] = useState('');

useEffect(() => {
  dispatch({type: `GET_USER_INFO`});
}, [dispatch]);

// change state to open user info modal
const openModal = () => {
    setModal(true);
    userData.map((item, i) => setIndustry(item.industry));
}
// change state to close user info modal
const closeModal = () => {
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

  return(
    <center>
      <div className='main-container'>
        {/* {JSON.stringify(userData)} */}
        
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
            {JSON.stringify(industry)}
            <select className="modal-input"  value={industry} 
             onChange={(event) => setIndustry(event.target.value)}>
              {industryData.map((item, i) => 
                    <option>{item.industry}</option>
              )}
            </select>
              <input type="button" value="Change Password?" onClick={() => openPassModal()}></input>
              <div className="modal-btn-container">
                <button className="normal-btn" href="javascript:void(0);" 
                onClick={() => closeModal()}>Close</button>
              </div>
          </Modal>

          <Modal
          visible={passwordModal}
          width="400"
          height="300"
          effect="fadeInUp"
          onClickAway={() => closePassModal()}
        >
          <h1 className="main-heading admin-user-heading">Please Confirm New Password</h1>
              <div className="modal-btn-container">
                <button className="normal-btn" href="javascript:void(0);" 
                onClick={() => closePassModal()}>Close</button>
              </div>
          </Modal>
        </div>
      </center>
  )
}