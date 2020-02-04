import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-awesome-modal';
import './User.css'

export default function User(){

let dispatch = useDispatch();
let userData = useSelector(state => state.admin.adminUserInfo);
let industryData = useSelector(state => state.industry.industry);
const [modal, setModal] = useState(false);
const [passwordModal, setPasswordModal] = useState(false);
const [name, setName] = useState('');
const [company, setCompany] = useState('');
const [phone, setPhone] = useState('');
const [email, setEmail] = useState('');
const [industry, setIndustry] = useState('');

useEffect(() => {
  dispatch({type: `GET_ADMIN_USER_INFO`});
  dispatch({type: `GET_INDUSTRY`});
}, [dispatch]);

// change state to open user info modal
const openModal = () => {
    setModal(true);
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
        <h1 className='user-spacing'>Welcome back, req.user.name!</h1>
        <h2 className='user-spacing'>Profile Information</h2>
          {userData.map((user, i) => 
          <ul className='user-info' key={i}>
            <li>Name: {user.name}</li>
            <li>Comapny: {user.company}</li>
            <li>Phone: {user.phone}</li>
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
                <input value={company} placeholder={user.company} 
                 onChange={(event) => setCompany(event.target.value)}></input>
                <input value={phone} placeholder={user.phone}
                 onChange={(event) => setPhone(event.target.value)}></input>
                <input value={email} placeholder={user.email}
                 onChange={(event) => setEmail(event.target.value)}></input>
              </div>
            )}
            <select>
              {industryData.map((industry, i) => 
                    <option>{industry.industry}</option>
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