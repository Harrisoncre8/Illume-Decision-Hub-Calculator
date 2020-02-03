import React, {Component} from 'react';
import {connect} from 'react-redux';
import './AdminEditUserInfo.css';
import Modal from 'react-awesome-modal';

class AdminEditUserInfo extends Component{

  state = {
    visible: false
  }

  componentDidMount(){
    this.props.dispatch({type: `GET_ADMIN_USER_INFO`});
  }

  closeModal = () => {
    this.setState({visible : false});
  }

  handleClick = id => {
    this.setState({visible: true});
  }

  render(){
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
                  <td className="admin-edit-user-cell" onClick={()=>this.handleClick(user.id)}>Edit Info</td>
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
          </Modal>
        </div>
      </center>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  user: reduxState.admin.adminUserInfo
});

export default connect(putReduxStateOnProps)(AdminEditUserInfo);