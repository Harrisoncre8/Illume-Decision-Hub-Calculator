import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-awesome-modal';
import './User.css'
import Nav from '../Nav/Nav';
import QuestionCheckboxes from '../QuestionCheckboxes/QuestionCheckboxes';
import UserCalcToggle from '../UserCalcToggle/UserCalcToggle';

export default function User() {

  // Set data from redux
  const dispatch = useDispatch();
  const industryData = useSelector(state => state.industry);
  const userData = useSelector(state => state.userInfo);
  const userID = useSelector(state => state.user.id);
  const passwordStatusData = useSelector(state => state.passwordStatus);

  // Set state for modal
  const [modal, setModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);

  // Set state for user information
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [industry, setIndustry] = useState('');
  const [industryID, setIndustryID] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState('password');

  // Set state to be deployed on password change
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

  // Check and saves the user's new password and closes modal
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

  // Add class if input has a value, removes the class if input has no value
  const checkForValue = e => e.target.value ? e.target.classList.add('text-field-active') : e.target.classList.remove('text-field-active');

  // Change state to close user info modal
  const closeModal = () => {
    setModal(false);
  }

  // Close modal to change password
  const closePassModal = () => {
    setPasswordModal(false);
  }

  // Handle change for industry drop down
  const handleUserIndustry = e => {
    setIndustry(e.target.value);
    setIndustryID(industryData[industryData.findIndex(el => el.industry === e.target.value)] &&
    industryData[industryData.findIndex(el => el.industry === e.target.value)].id);  
  }

  // Change state to open user info modal and set default info to the modal
  const openModal = () => {
    setModal(true);
    setIndustry(userData[0].industry);
    setName(userData[0].name);
    setCompany(userData[0].business_name);
    setPhone(userData[0].phone_number);
    setEmail(userData[0].email);
    setIndustryID(userData[0].industry_id);
  }

  // Open modal to change password
  const openPassModal = () => {
    setPasswordModal(true);
  }

  // Save user info changes and sends to DB
  const saveChanges = () => {
    let userInfo = {id, name, company, phone, email, industryID};
    dispatch({type: `PUT_USER_INFO`, payload: userInfo});
    setModal(false);
  }

  return(
    <center>
      <Nav />
      <div className="main-container">
        <div className="top-card-container">
          <div className="profile-personal-details-container">
            {userData.map((user, i) => 
              <div key={i}>
                <h1 className='user-spacing'>Welcome back, {user.name}!</h1>
                <h2 className='user-spacing'>Profile Information</h2>
                <div className="profile-list-container">
                  <table className="profile-text user-info">
                    <tbody>
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
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            <button className="normal-btn" onClick={openModal}>Edit Profile</button>
          </div>

          <Modal
            visible={modal}
            width="400"
            height="480"
            effect="fadeInUp"
            onClickAway={closeModal}
          >
            <div className="modal-container">
              <button className="close-window-button" onClick={closeModal}>x</button>
              <h1 className="main-heading modal-heading">Edit Info</h1>

              <div className="text-field-container">
                <input
                  className="text-field text-field-active"
                  type="text"
                  value={name}
                  onChange={(e) => {
                                setName(e.target.value);
                                checkForValue(e);
                              }
                            }
                />
                <label className="text-field-label">name</label>
                <div className="text-field-mask profile-mask-name"></div>
              </div>

              <div className="text-field-container">
                <input
                  className="text-field text-field-active"
                  type="text"
                  value={company}
                  onChange={(e) => {
                                setCompany(e.target.value);
                                checkForValue(e);
                              }
                            }
                />
                <label className="text-field-label">company</label>
                <div className="text-field-mask profile-mask-company"></div>
              </div>

              <div className="text-field-container">
                <input
                  className="text-field text-field-active"
                  type="text"
                  value={phone}
                  onChange={(e) => {
                                setPhone(e.target.value);
                                checkForValue(e);
                              }
                            }
                />
                <label className="text-field-label">phone #</label>
                <div className="text-field-mask profile-mask-phone"></div>
              </div>

              <div className="text-field-container">
                <input
                  className="text-field text-field-active"
                  type="text"
                  value={email}
                  onChange={(e) => {
                                setEmail(e.target.value);
                                checkForValue(e);
                              }
                            }
                />
                <label className="text-field-label">email</label>
                <div className="text-field-mask profile-mask-email"></div>
              </div>

              <select 
                className="dropdown register-dropdown"  
                value={industry} 
                onChange={handleUserIndustry}
              > 
                {industryData.map(item => 
                  <option className="dropdown-option" key={item.id}>{item.industry}</option>
                )}
              </select>

              <button className="secondary-btn profile-password-font-size" onClick={openPassModal}>Change Password?</button>
              <div className="modal-btn-container">
                <button className="normal-btn profile-modal-btns" onClick={closeModal}>
                  Cancel
                </button>
                <button className="normal-btn" onClick={saveChanges}>
                  Save
                </button>
              </div>
            </div>
          </Modal>

          <Modal
            visible={passwordModal}
            width="400"
            height="390"
            effect="fadeInUp"
            onClickAway={closePassModal}
          >
            <div className="modal-container">
              <button className="close-window-button" onClick={closePassModal}>x</button>
              <h1 className="main-heading modal-heading">Change Password</h1>
              {wrongPassword ? <p>Oops, your new password does not match.</p> : null}
              {passwordStatusData === 401 ? <p>Oops, your current password is incorrect, please try again</p> : null}

              <div className="text-field-container">
                <input
                  className="text-field"
                  type={showPassword}
                  value={oldPassword}
                  onChange={(e) => {
                                setOldPassword(e.target.value);
                                checkForValue(e);
                              }
                            }
                />
                <label className="text-field-label">current password</label>
                <div className="text-field-mask profile-mask-old-password"></div>
              </div>

              <div className="text-field-container">
                <input
                  className="text-field"
                  type={showPassword}
                  value={newPassword}
                  onChange={(e) => {
                                setNewPassword(e.target.value);
                                checkForValue(e);
                              }
                            }
                />
                <label className="text-field-label">new password</label>
                <div className="text-field-mask profile-mask-new-password"></div>
              </div>

              <div className="text-field-container">
                <input
                  className="text-field"
                  type={showPassword}
                  value={checkPassword}
                  onChange={(e) => {
                                setCheckPassword(e.target.value);
                                checkForValue(e);
                              }
                            }
                />
                <label className="text-field-label">confirm password</label>
                <div className="text-field-mask profile-mask-confirm-new-password"></div>
                <span>
                  <input type="checkbox" onClick={()=>showPassword === 'text' ? setShowPassword('password') : setShowPassword('text')} />
                  <label> Show Password</label>
                </span>
              </div>

              <div className="modal-btn-container">
                <button className="normal-btn profile-modal-btns" onClick={closePassModal}>
                  Cancel
                </button>
                <button className="normal-btn" onClick={changePassword}>
                  Save
                </button>
              </div>
            </div>
          </Modal>
          <QuestionCheckboxes />
          <UserCalcToggle />
        </div>
      </div>
    </center>
  );
}