import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AdminEditUserInfo.css';
import Modal from 'react-awesome-modal';
import Nav from '../Nav/Nav';

class AdminEditUserInfo extends Component {

  state = {
    visible: false,
    showPassword: 'password',
    selectedUser: {
      id: '',
      name: '',
      company: '',
      phone: '',
      email: '',
      industry: '',
      industryid: '',
      password: '',
      checkPassword: '',
      wrongPassword: null,
      usertype: false,
    }
  }

  // Dispatch to GET user data from the database
  componentDidMount() {
    this.props.dispatch({ type: `GET_ADMIN_USER_INFO` });
    this.props.dispatch({ type: `GET_INDUSTRY` });
  }

  // Adds class if input has a value, removes the class if input has no value
  checkForValue = e => e.target.value ? e.target.classList.add('text-field-active') : e.target.classList.remove('text-field-active');

  // Close modal popup
  closeModal = () => this.setState({ visible: false });

  // Show or hide password
  togglePasswordView = () => this.state.showPassword === 'password' ? this.setState({showPassword: 'text'}) : this.setState({showPassword: 'password'});

  // Set local state to current input value
  handleChange = (e, propName) => {
    this.setState({
      selectedUser: {
        ...this.state.selectedUser,
        [propName]: e.target.value
      }
    });
    this.checkForValue(e);
  }

  // Set input value to current dropdown menu selection
  handleDropdownChange = (e, propName) => {
    switch (propName) {
      case 'industryid':
        this.setState({
          selectedUser: {
            ...this.state.selectedUser,
            [propName]: e.target.value
          }
        });
        break;
      case 'usertype':
        this.setState({
          selectedUser: {
            ...this.state.selectedUser,
            usertype: !this.state.selectedUser.usertype
          }
        });
        break;
      default:
        break;
    }
  }

  // Dispatch to saga to handle admin edits, close modal
  handleSave = () => {
    if(this.state.selectedUser.password === this.state.selectedUser.checkPassword){
      let passwordInfo = [this.state.selectedUser.password, this.state.selectedUser.id];
      this.props.dispatch({type: `NEW_PASSWORD`, payload: passwordInfo});
      this.props.dispatch({ type: `PUT_ADMIN_USER_INFO`, payload: this.state.selectedUser });
      this.closeModal();
    }
    else if (!this.state.selectedUser.password && !this.state.selectedUser.checkPassword){
      this.props.dispatch({ type: `PUT_ADMIN_USER_INFO`, payload: this.state.selectedUser });
      this.closeModal();
    }
    else if(this.state.selectedUser.password !== this.state.selectedUser.checkPassword){
      alert('make sure your passwords match')
    }

  }

  // Open modal popup, populate input fields from local state
  openModal = user => {
    this.setState({
      visible: true,
      username: user.name,
      selectedUser: {
        ...user,
        password: ''
      }
    });
  }

  // Return to admin home page
  pushHistoryBack = () => this.props.history.push('/admin');

  render() {
    let editUser = this.state.selectedUser;

    return (
      <center>
        <Nav />
        <div className="main-container">
          <div className="top-card-container">
            <button className="close-window-button" onClick={this.pushHistoryBack}>x</button>
            <h1 className="main-heading admin-user-heading">User Information</h1>
            <table className="admin-user-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.props.user.map(user =>
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
                    value={editUser.checkPassword}
                    onChange={(e) => this.handleChange(e, 'checkPassword')}
                   />
                  <label className="text-field-label">confirm password</label>
                  <div className="text-field-mask admin-user-mask-confirm-password"></div>
                  <span>
                    <input type="checkbox" onChange={this.togglePasswordView} />
                    <label> {this.state.showPassword === 'text' ? 'Hide' : 'Show'} Passwords</label>
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
}

const putReduxStateOnProps = reduxState=>({
  industry: reduxState.industry,
  user: reduxState.adminUserInfo
});

export default connect(putReduxStateOnProps)(AdminEditUserInfo);