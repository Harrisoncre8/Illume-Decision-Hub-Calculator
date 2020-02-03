import React, {Component} from 'react';
import {connect} from 'react-redux';

class AdminEditUserInfo extends Component{

  componentDidMount(){
    this.props.dispatch({type: `GET_ADMIN_USER_INFO`});
  }

  handleClick = (id) => {
  }

  render(){
    return(
      <center>
        <div className="main-container">
          {JSON.stringify(this.props.user)}
          <h1 className="main-heading">User Information</h1>
          <table>
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
                  <td className="admin-edit-user-cell" onClick={()=>this.handleClick(user.id)}></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </center>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  user: reduxState.admin.adminUserInfo
});

export default connect(putReduxStateOnProps)(AdminEditUserInfo);