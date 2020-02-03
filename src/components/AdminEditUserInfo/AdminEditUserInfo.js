import React, {Component} from 'react';
import {connect} from 'react-redux';
import './AdminEditUserInfo.css';
import Modal from 'react-awesome-modal';

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
      password: ''
    }
  }

  componentDidMount(){
    this.props.dispatch({type: `GET_ADMIN_USER_INFO`});
    this.props.dispatch({type: `GET_INDUSTRY`});
  }

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
  }

  handleDropdownChange = e => {
    this.setState({
      selectedUser: {
        ...this.state.selectedUser,
        industry: e.target.value
      }
    });
  }

  handleSave = () => {
    this.props.dispatch({type: `PUT_ADMIN_USER_INFO`, payload: this.state.selectedUser});
  }

  openModal = user => {
    this.setState({
      visible: true,
      selectedUser: user
    });
  }

  pushHistoryBack = () => {
    this.props.history.push('/admin');
  }

  render(){
    let editUser = this.state.selectedUser;

    return(
      <center>
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
            width="400"
            height="300"
            effect="fadeInUp"
            onClickAway={this.closeModal}
          >
            <div className="modal-container">
              {JSON.stringify(this.state.selectedUser)}
              <button className="close-window-button" onClick={this.closeModal}>x</button>
              <h1 className="main-heading modal-heading">{editUser.name}</h1>
              <input 
                className="modal-input" 
                type="text" 
                value={editUser.name} 
                onChange={(event)=>this.handleChange(event, 'name')}
                placeholder="user's name" 
              />
              <input 
                className="modal-input" 
                type="text" 
                value={editUser.company} 
                onChange={(event)=>this.handleChange(event, 'company')}
                placeholder="company" 
              />
              <input 
                className="modal-input" 
                type="tel" 
                value={editUser.phone} 
                onChange={(event)=>this.handleChange(event, 'phone')}
                placeholder="phone #" 
              />
              <input 
                className="modal-input" 
                type="text" 
                value={editUser.email} 
                onChange={(event)=>this.handleChange(event, 'email')}
                placeholder="email" 
              />
              <select 
                className="modal-input" 
                value={this.state.selectedUser.industry || 'industry'}
                onChange={this.handleDropdownChange}
              >
                {this.props.industry.map(industry =>
                  <option key={industry.id}>{industry.industry}</option>
                )}
              </select>
              <input 
                className="modal-input" 
                type="text" 
                value={editUser.password} 
                onChange={(event)=>this.handleChange(event, 'password')}
                placeholder="reset password" 
              />
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