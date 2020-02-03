import React, {Component} from 'react';
import {connect} from 'react-redux';

class AdminEditUserInfo extends Component{

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
              {this.props.reduxState.map(user => 
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.company}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td></td>
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
  reduxState: reduxState.OBJECT
});

export default connect(putReduxStateOnProps)(AdminEditUserInfo);