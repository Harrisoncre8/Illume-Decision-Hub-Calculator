import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-awesome-modal';
import './User.css'

export default function User(){

let dispatch = useDispatch();
let userData = useSelector(state => state.admin.adminUserInfo);
// let industryData = useSelector(state => state.industry);
const [modal, setModal] = useState(false);
const [name, setName] = useState('');
const [company, setCompany] = useState('');
const [phone, setPhone] = useState('');
const [email, setEmail] = useState('');
const [industry, setIndustry] = useState('');

useEffect(() => {
  dispatch({type: `GET_ADMIN_USER_INFO`});
  dispatch({type: `GET_INDUSTRY`});
}, [dispatch]);

// change state to open modal
const openModal = () => {
    setModal(true);
}
// change state to close modal
const closeModal = () => {
    setModal(false);
}

  return(
    <center>
      <div className='main-container'>
        <h1>Hello, req.user.name!</h1>
        <h2>Description of Calculator</h2>
        <h2>Profile Information</h2>
          {userData.map((user, i) => 
          <ul className="user-info" key={i}>
            <li>Name: {user.name}</li>
            <li>Comapny: {user.company}</li>
            <li>Phone: {user.phone}</li>
            <li>Email: {user.email}</li>
            <li>Industry: {user.industry}</li>
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
                <input placeholder={user.name}></input>
                <input placeholder={user.company}></input>
                <input placeholder={user.phone}></input>
                <input placeholder={user.email}></input>
                <input placeholder={user.industry}></input>
              </div>
            )}
              <div className="modal-btn-container">
                <button className="normal-btn" href="javascript:void(0);" 
                onClick={() => closeModal()}>Close</button>
              </div>
          </Modal>
        </div>
      </center>
  )
}