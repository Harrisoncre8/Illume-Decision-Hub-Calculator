import React, {Component} from 'react';
import {connect} from 'react-redux';
import './AdminEditUserInfo.css';
import Modal from 'react-awesome-modal';
import Nav from '../Nav/Nav';

class AdminEditUserInfo extends Component{

  state = {
    visible: false,
    selectedUser: {
      id: '',
      name: '',
      company: '',
      phone: '',
      email: '',
      industry: '',
      industryid: '',
      password: '',
      usertype: false,
    }
  }

  componentDidMount(){
    this.props.dispatch({type: `GET_ADMIN_USER_INFO`});
    this.props.dispatch({type: `GET_INDUSTRY`});
  }

  // Adds class if input has a value, removes the class if input has no value
  checkForValue = e => e.target.value ? e.target.classList.add('text-field-active') : e.target.classList.remove('text-field-active');

  closeModal = () => {
    this.setState({visible : false});
  }

  handleChange = (e, propName) => {
    this.setState({
      selectedUser: {
        ...this.state.selectedUser,
        [propName]: e.target.value
      }
    });
    this.checkForValue(e);
  }

  handleDropdownChange = (e, propName) => {
    console.log('alskjdf;kl', e.target.value);
    switch (propName){
      case 'industryid':
        this.setState({
          selectedUser: {
            ...this.state.selectedUser,
            [propName]: e.target.value
          }
        })
        break;
      case 'usertype':
        this.setState({
          selectedUser: {
            ...this.state.selectedUser,
            usertype: !this.state.selectedUser.usertype
          }
        })
        break;
      default:
        break;
    }
  }

  handleSave = () => {
    this.props.dispatch({type: `PUT_ADMIN_USER_INFO`, payload: this.state.selectedUser});
    console.log('user to save is:', this.state.selectedUser );
    
    this.setState({
      visible: false
    });
  }

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

  pushHistoryBack = () => {
    this.props.history.push('/admin');
  }

  render(){
    let editUser = this.state.selectedUser;

    return(
      <center>
        <Nav />
        <div className="main-container">
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
                  <td className="admin-edit-user-cell" onClick={()=>this.openModal(user)}>Edit Info</td>
                </tr>
              )}
            </tbody>
          </table>
          <Modal 
            visible={this.state.visible}
            width="440"
            height="500"
            effect="fadeInUp"
            onClickAway={this.closeModal}
          >
            <div className="modal-container">
              {JSON.stringify(this.state.selectedUser.usertype)}
              <button className="close-window-button" onClick={this.closeModal}>x</button>
              <h1 className="main-heading modal-heading">{this.state.username}</h1>
              
              <div className="admin-user-text-field-container">
                <input 
                  className="text-field admin-user-text-field-name text-field-active" 
                  type="text" 
                  value={editUser.name}
                  onChange={(event)=>this.handleChange(event, 'name')}
                />
                <label className="text-field-label admin-user-label-name">user's name</label>
                <div className="text-field-mask admin-user-mask-name"></div>
              </div>

              <div className="admin-user-text-field-container">
                <input 
                  className="text-field admin-user-text-field-company text-field-active" 
                  type="text" 
                  value={editUser.company} 
                  onChange={(event)=>this.handleChange(event, 'company')}
                />
                <label className="text-field-label admin-user-label-company">company</label>
                <div className="text-field-mask admin-user-mask-company"></div>
              </div>

              <div className="admin-user-text-field-container">
                <input 
                  className="text-field admin-user-text-field-phone text-field-active" 
                  type="text" 
                  value={editUser.phone} 
                  onChange={(event)=>this.handleChange(event, 'phone')}
                />
                <label className="text-field-label admin-user-label-phone">phone #</label>
                <div className="text-field-mask admin-user-mask-phone"></div>
              </div>

              <div className="admin-user-text-field-container">
                <input 
                  className="text-field admin-user-text-field-email text-field-active" 
                  type="text" 
                  value={editUser.email} 
                  onChange={(event)=>this.handleChange(event, 'email')}
                />
                <label className="text-field-label admin-user-label-email">email</label>
                <div className="text-field-mask admin-user-mask-email"></div>
              </div>

              <div className="admin-user-text-field-container">
                <input 
                  className="text-field admin-user-text-field-password text-field-active" 
                  type="text" 
                  value={editUser.password} 
                  onChange={(event)=>this.handleChange(event, 'password')}
                />
                <label className="text-field-label admin-user-label-password">password</label>
                <div className="text-field-mask admin-user-mask-password"></div>
              </div>
              
              <select 
                className="modal-input" 
                value={this.state.selectedUser.industryid || 'industry'}
                onChange={(event)=>this.handleDropdownChange(event, 'industryid')}
                >
                {this.props.industry.map(industry =>
                  <option key={industry.id} value={industry.id}>{industry.industry}</option>
                )}
              </select>

              <select 
                className="modal-input" 
                value={this.state.selectedUser.usertype || 'usertype'}
                onChange={(event)=>this.handleDropdownChange(event, 'usertype')}
              >
                  <option key={1} value={false}>User</option>
                  <option key={2} value={true}>Admin</option>
              </select>

              <div className="modal-btn-container"> 
                <button className="normal-btn" onClick={this.handleSave}>Save</button>
              </div>
            </div>
          </Modal>
        </div>
      </center>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  industry: reduxState.industry.industry,
  user: reduxState.admin.adminUserInfo
});

export default connect(putReduxStateOnProps)(AdminEditUserInfo);