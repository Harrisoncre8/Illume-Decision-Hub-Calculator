import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './AdminEditUserInfo.css';
import Modal from 'react-awesome-modal';
import Nav from '../Nav/Nav';
import { useHistory } from 'react-router-dom';

export default function AdminEditUserInfo() {

  const dispatch = useCallback(useDispatch());
  const history = useHistory();
  const industryList = useSelector(state => state.industry);
  const user = useSelector(state => state.adminUserInfo);
  const [checkPassword, setCheckPassword] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [industry, setIndustry] = useState('');
  const [industryId, setIndustryId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState('password');
  const [username, setUsername] = useState('');
  const [usertype, setUsertype] = useState(false);
  const [visible, setVisible] = useState(false);

  // Run on component mount
  useEffect(()=>{
    dispatch({type: `GET_ADMIN_USER_INFO`});
    dispatch({type: `GET_INDUSTRY`});
  }, [dispatch]);

  // Add class if input has a value, removes the class if input has no value
  const checkForValue = e => e.target.value ? e.target.classList.add('text-field-active') : e.target.classList.remove('text-field-active');

  // Close modal popup
  const closeModal = () => setVisible(false);

  // Show or hide password
  const togglePasswordView = () => showPassword === 'password' ? setShowPassword('text') : setShowPassword('password');

  // Dispatch to saga to handle admin edits, close modal ///////////////////////////////////////////TEST TEST TEST TEST
  const handleSave = e => {
    e.preventDefault();
    let selectedUser = {id, name, company, phone, email, industryId, password, usertype};
    if(password.length > 0 && password === checkPassword){
      let passwordInfo = [password, id];
      dispatch({type: `NEW_PASSWORD`, payload: passwordInfo});
      dispatch({ type: `PUT_ADMIN_USER_INFO`, payload: selectedUser });
      closeModal();
    }
    else if(password.length === 0 && checkPassword.length === 0){
      dispatch({ type: `PUT_ADMIN_USER_INFO`, payload: selectedUser });
      closeModal();
    }
    else if(password !== checkPassword){
      alert('Make sure your passwords match!');
    }
  }

  // Open modal popup, populate input fields from local state
  const openModal = user => {
    setVisible(true);
    setUsername(user.name);
    setId(user.id);
    setName(user.name);
    setCompany(user.company);
    setPhone(user.phone);
    setEmail(user.email);
    setIndustry(user.industry);
    setIndustryId(user.industryid);
  }

  // Return to admin home page
  const pushHistoryBack = () => history.push('/admin');

  return (
    <center>
      <Nav />
      <div className="main-container">
        <div className="top-card-container">
          <button className="close-window-button" onClick={pushHistoryBack}>x</button>
          <h1 className="main-heading admin-user-heading">User Information</h1>
          <table className="admin-user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {user.map(user =>
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.company}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td className="admin-edit-user-cell" onClick={() => openModal(user)}>Edit Info</td>
                </tr>
              )}
            </tbody>
          </table>
          <Modal
            visible={visible}
            width="440"
            height="570"
            effect="fadeInUp"
            onClickAway={closeModal}
          >
            <div className="modal-container">
              <button className="close-window-button" onClick={closeModal}>x</button>
              <h1 className="main-heading modal-heading">{username}</h1>

              <form onSubmit={handleSave}>
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
                  <label className="text-field-label">user's name</label>
                  <div className="text-field-mask admin-user-mask-name"></div>
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
                  <div className="text-field-mask admin-user-mask-company"></div>
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
                  <div className="text-field-mask admin-user-mask-phone"></div>
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
                  <div className="text-field-mask admin-user-mask-email"></div>
                </div>

                <div className="text-field-container">
                  <input
                    className="text-field text-field-active"
                    type={showPassword} 
                    value={password}
                    onChange={(e) => {
                                  setPassword(e.target.value);
                                  checkForValue(e);
                                }
                              }
                  />
                  <label className="text-field-label">password</label>
                  <div className="text-field-mask admin-user-mask-password"></div>
                </div>

                <div className="text-field-container">
                  <input
                    className="text-field text-field-active"
                    type={showPassword} 
                    onChange={(e) => {
                                  setCheckPassword(e.target.value);
                                  checkForValue(e);
                                }
                              }
                    />
                  <label className="text-field-label">confirm password</label>
                  <div className="text-field-mask admin-user-mask-confirm-password"></div>
                  <span>
                    <input type="checkbox" onChange={togglePasswordView} />
                    <label> Show Passwords</label>
                  </span>
                </div>

                <select
                  className="dropdown register-dropdown"
                  value={industryId || 'industry'}
                  onChange={(e) => setIndustryId(e.target.value)} ///////////////////////////////////////////
                >
                  <option className="dropdown-option" value='' disabled>Select Industry</option>
                  {industryList.map(industry =>
                    <option key={industry.id} value={industry.id}>{industry.industry}</option>
                  )}
                </select>

                <select
                  className="dropdown register-dropdown"
                  value={usertype || 'usertype'}
                  onChange={() => setUsertype(!usertype)}
                >
                  <option className="dropdown-option" value='' disabled>Select User Type</option>
                  <option className="dropdown-option" key={1} value={false}>User</option>
                  <option className="dropdown-option" key={2} value={true}>Admin</option>
                </select>

                <div className="modal-btn-container">
                  <button className="normal-btn" type="submit">Save</button>
                </div>
              </form>

            </div>
          </Modal>
        </div>
      </div>
    </center>
  );
}