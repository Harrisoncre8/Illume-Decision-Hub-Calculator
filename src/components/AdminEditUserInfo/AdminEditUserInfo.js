import React, {Component} from 'react';
import {connect} from 'react-redux';

class AdminEditUserInfo extends Component{

  handleClick = (id) => {
  }

  render(){
    return(
      <center>
        <div className="main-container">
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
                  <td>{user.business_name}</td>
                  <td>{user.phone_number}</td>
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
  user: reduxState.OBJECT
});

export default connect(putReduxStateOnProps)(AdminEditUserInfo);