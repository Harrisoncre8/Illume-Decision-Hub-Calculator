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

  handleClick = user => {
    this.setState({
      visible: true,
      selectedUser: user
    });
  }

  render(){
    let editUser = this.state.selectedUser;   
    return(
      <center>
        <div className="main-container">
          <h1 className="main-heading">User Information</h1>
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
                  <td className="admin-edit-user-cell" onClick={()=>this.handleClick(user)}>Edit Info</td>
                </tr>
              )}
            </tbody>
          </table>
          <Modal 
            visible={this.state.visible}
            width="400"
            height="300"
            effect="fadeInUp"
            onClickAway={() => this.closeModal()}
          >
            <h1 className="main-heading">{editUser.name}</h1>
            <input type="text" value={editUser.name} />
            <input type="text" value={editUser.company} />
            <input type="text" value={editUser.phone} />
            <input type="text" value={editUser.email} />
            <select>
              {this.props.industry.map(industry =>
                <div key={industry.id}>
                  <option>industry.industry</option>
                </div>
              )}
            </select>
            <input type="text" value={editUser.password} placeholder="reset password" />

          </Modal>
        </div>
      </center>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  industry: reduxState.industry,
  user: reduxState.admin.adminUserInfo
});

export default connect(putReduxStateOnProps)(AdminEditUserInfo);