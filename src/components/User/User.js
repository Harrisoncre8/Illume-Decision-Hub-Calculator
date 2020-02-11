import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-awesome-modal';
import './User.css'
import Nav from '../Nav/Nav';
import QuestionCheckboxes from '../QuestionCheckboxes/QuestionCheckboxes';

export default function User() {

  // getting data from redux
  let dispatch = useDispatch();
  let industryData = useSelector(state => state.industry);
  let userData = useSelector(state => state.userInfo);
  let userID = useSelector(state => state.user.id);
  let passwordStatusData = useSelector(state => state.passwordStatus);

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
  // setting state to be deployed on password change
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [wrongPassword, setWrongPassword] = useState(null);

  // on page load, get user and industry info and set state to userID,
  // if current password match, reset inputs, close the modal
  useEffect(() => {
    if(userID){
      setId(userID);
      dispatch({type: `GET_USER_INFO`, payload: userID});
      dispatch({type: `GET_INDUSTRY`});
      if(passwordStatusData === 200) {
        setPasswordModal(false);
        dispatch({type: `MATCH_PASSWORD`, payload: null});
        setOldPassword('');
        setNewPassword('');
        setCheckPassword('');
      }
    }
  }, [userID, dispatch, passwordStatusData]);

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

  // checks and saves the user's new password
  // and closes modal
  const changePassword = () => {
    if(newPassword === checkPassword){
      let passwordInfo = {oldPassword, newPassword, id};
      dispatch({type: `NEW_PASSWORD`, payload: passwordInfo});
      if(passwordStatusData === 401){
        setPasswordModal(true);
      } 
    }
    else if(newPassword !== checkPassword){
      setWrongPassword(true);
    }
  }

  // close modal to change password
  const closePassModal = () => {
    setPasswordModal(false);
  }

  // handle change for industry drop down
  const handleUserIndustry = e => {
    setIndustry(e.target.value);
    setIndustryID(industryData[industryData.findIndex(el => el.industry === e.target.value)] &&
    industryData[industryData.findIndex(el => el.industry === e.target.value)].id);  
  }

  return(
    <center>
      <Nav />
      <div className="main-container">
        <div className="profile-personal-details-container">
          {userData.map(user => 
            <div key={user.id}>
              <h1 className='user-spacing'>Welcome back, {user.name}!</h1>
              <h2 className='user-spacing'>Profile Information</h2>
              <div className="profile-list-container">
                <table className="profile-text user-info">
                  <tr>
                    <td>Name:</td>
                    <td className="profile-center">{user.name}</td>
                  </tr>
                  <tr>
                    <td>Company:</td>
                    <td className="profile-center">{user.business_name}</td>
                  </tr>
                  <tr>
                    <td>Phone:</td>
                    <td className="profile-center">{user.phone_number}</td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td className="profile-center">{user.email}</td>
                  </tr>
                </table>
              </div>
            </div>
          )}
          <button className="normal-btn" onClick={openModal}>Edit Profile</button>
        </div>

        <Modal
          visible={modal}
          width="400"
          height="300"
          effect="fadeInUp"
          onClickAway={closeModal}
        >
          <h1 className="main-heading admin-user-heading">Edit User Information</h1>

          <div className="text-field-container">
            <input
              className="text-field text-field-active"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="text-field-label">name</label>
            <div className="text-field-mask profile-mask-name"></div>
          </div>

          <div className="text-field-container">
            <input
              className="text-field text-field-active"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            <label className="text-field-label">company</label>
            <div className="text-field-mask profile-mask-company"></div>
          </div>

          <div className="text-field-container">
            <input
              className="text-field text-field-active"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label className="text-field-label">phone #</label>
            <div className="text-field-mask profile-mask-phone"></div>
          </div>

          <div className="text-field-container">
            <input
              className="text-field text-field-active"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="text-field-label">email</label>
            <div className="text-field-mask profile-mask-email"></div>
          </div>

          <select 
            className="modal-input"  
            value={industry} 
            onChange={handleUserIndustry}
          > 
            {industryData.map(item => 
              <option key={item.id}>{item.industry}</option>
            )}
          </select>




            {/* MAKE SECONDARY BUTTON */}
            <button className="normal-btn" onClick={openPassModal}>Change Password?</button>





            <div className="modal-btn-container">
              <button className="normal-btn" onClick={saveChanges}>
                Save
              </button>
              <button className="normal-btn" onClick={closeModal}>
                Cancel
              </button>
            </div>
        </Modal>

        <Modal
          visible={passwordModal}
          width="400"
          height="300"
          effect="fadeInUp"
          onClickAway={closePassModal}
        >
          <h1 className="main-heading admin-user-heading">Change Password</h1>
          {wrongPassword ? <p>Oops, your new password does not match.</p> : null}
          {passwordStatusData === 401 ? <p>Oops, your current password is incorrect, please try again</p> : null}
            <div>
              <input value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
              <label>Current Password</label>
            </div>

            <div>
              <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              <label>New Password</label>
            </div>

            <div>
              <input value={checkPassword} onChange={(e) => setCheckPassword(e.target.value)} />
              <label>Confirm New Password</label>
            </div>
            <div className="modal-btn-container">
              <button className="normal-btn" onClick={changePassword}>
                Confirm
              </button>
              <button className="normal-btn" onClick={closePassModal}>
                Cancel
              </button>
            </div>
        </Modal>
        <QuestionCheckboxes />
      </div>
    </center>
  );
}