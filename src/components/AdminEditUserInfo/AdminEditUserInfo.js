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
  const [userType, setUserType] = useState(false);
  const [visible, setVisible] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(null);

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

  // Set input value to current dropdown menu selection
  // handleDropdownChange = (e, propName) => {
  //   switch (propName) {
  //     case 'industryid':
  //       this.setState({
  //         selectedUser: {
  //           ...this.state.selectedUser,
  //           [propName]: e.target.value
  //         }
  //       });
  //       break;
  //     case 'usertype':
  //       this.setState({
  //         selectedUser: {
  //           ...this.state.selectedUser,
  //           usertype: !this.state.selectedUser.usertype
  //         }
  //       });
  //       break;
  //     default:
  //       break;
  //   }
  // }

  // Dispatch to saga to handle admin edits, close modal ///////////////////////////////////////////TEST TEST TEST TEST
  const handleSave = () => {
    if(password === checkPassword){
      let passwordInfo = [password, id];
      let selectedUser = {id, name, company, phone, email, industry, industryId, password, checkPassword, wrongPassword, userType}
      dispatch({type: `NEW_PASSWORD`, payload: passwordInfo});
      dispatch({ type: `PUT_ADMIN_USER_INFO`, payload: selectedUser });
      closeModal();
    }
    else if(!password && !checkPassword){
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
    setIndustryId(user.industryId);
  }

  // Return to admin home page
  const pushHistoryBack = () => history.push('/admin');

    let editUser = this.state.selectedUser; ///////////////////////////////////////////

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
                  <td className="admin-edit-user-cell" onClick={() => this.openModal(user)}>Edit Info</td>
                </tr>
              )}
            </tbody>
          </table>
          <Modal
            visible={this.state.visible}
            width="440"
            height="570"
            effect="fadeInUp"
            onClickAway={this.closeModal}
          >
            <div className="modal-container">
              <button className="close-window-button" onClick={this.closeModal}>x</button>
              <h1 className="main-heading modal-heading">{this.state.username}</h1>

              <div className="text-field-container">
                <input
                  className="text-field text-field-active"
                  type="text"
                  value={editUser.name}
                  onChange={(e) => this.handleChange(e, 'name')}
                />
                <label className="text-field-label">user's name</label>
                <div className="text-field-mask admin-user-mask-name"></div>
              </div>

              <div className="text-field-container">
                <input
                  className="text-field text-field-active"
                  type="text"
                  value={editUser.company}
                  onChange={(e) => this.handleChange(e, 'company')}
                />
                <label className="text-field-label">company</label>
                <div className="text-field-mask admin-user-mask-company"></div>
              </div>

              <div className="text-field-container">
                <input
                  className="text-field text-field-active"
                  type="text"
                  value={editUser.phone}
                  onChange={(e) => this.handleChange(e, 'phone')}
                />
                <label className="text-field-label">phone #</label>
                <div className="text-field-mask admin-user-mask-phone"></div>
              </div>

              <div className="text-field-container">
                <input
                  className="text-field text-field-active"
                  type="text"
                  value={editUser.email}
                  onChange={(e) => this.handleChange(e, 'email')}
                />
                <label className="text-field-label">email</label>
                <div className="text-field-mask admin-user-mask-email"></div>
              </div>

              <div className="text-field-container">
                <input
                  className="text-field text-field-active"
                  type={this.state.showPassword} 
                  value={editUser.password}
                  onChange={(e) => this.handleChange(e, 'password')}
                />
                <label className="text-field-label">password</label>
                <div className="text-field-mask admin-user-mask-password"></div>
              </div>

              <div className="text-field-container">
                <input
                  className="text-field text-field-active"
                  type={this.state.showPassword} 
                  onChange={(e) => this.handleChange(e, 'checkPassword')}
                  />
                <label className="text-field-label">confirm password</label>
                <div className="text-field-mask admin-user-mask-confirm-password"></div>
                <span>
                  <input type="checkbox" onChange={this.togglePasswordView} />
                  <label> Show Passwords</label>
                </span>
              </div>

              <select
                className="dropdown register-dropdown"
                value={editUser.industryid || 'industry'}
                onChange={(e) => this.handleDropdownChange(e, 'industryid')}
              >
                <option className="dropdown-option" value='' disabled>Select Industry</option>
                {this.props.industry.map(industry =>
                  <option key={industry.id} value={industry.id}>{industry.industry}</option>
                )}
              </select>

              <select
                className="dropdown register-dropdown"
                value={editUser.usertype || 'usertype'}
                onChange={(e) => this.handleDropdownChange(e, 'usertype')}
              >
                <option className="dropdown-option" value='' disabled>Select User Type</option>
                <option className="dropdown-option" key={1} value={false}>User</option>
                <option className="dropdown-option" key={2} value={true}>Admin</option>
              </select>

              <div className="modal-btn-container">
                <button className="normal-btn" onClick={this.handleSave}>Save</button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </center>
  );
}