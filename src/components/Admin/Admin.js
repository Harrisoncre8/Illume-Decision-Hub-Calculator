import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Admin.css';

class Admin extends Component{

  pushHistoryToEditUserInfo = () => {
    this.props.history.push('/admin/edit-user-info');
  }

  render(){
    return(
      <center>
        <div className="main-container admin-padding">
          <h1>Welcome, JENNY OR SUSAN!</h1>
          <div className="admin-button-flex-container">
            <div className="admin-btn-flex-column">
              <button className="circle-btn">Edit Calculators</button>
            </div>
            <div className="admin-btn-flex-column">
              <button className="circle-btn" onClick={this.pushHistoryToEditUserInfo}>Edit User Information</button>
            </div>
            <div className="admin-btn-flex-column">
              <button className="circle-btn">Edit Industries</button>
            </div>
          </div>
        </div>
      </center>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.OBJECT
});

export default connect(putReduxStateOnProps)(Admin);