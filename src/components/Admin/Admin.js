import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Admin.css';

class Admin extends Component{

  pushHistoryToEditCalculatorInfo = () => {
    this.props.history.push('/admin/edit-calculator-info');
  }

  pushHistoryToEditIndustryInfo = () => {
    this.props.history.push('/admin/edit-industry-info');
  }

  pushHistoryToEditUserInfo = () => {
    this.props.history.push('/admin/edit-user-info');
  }

  addAdmin = () => {
    this.props.history.push('/admin/create-admin')
  }

  render(){
    return(
      <center>
        <div className="main-container admin-padding">
          <h1>Welcome, JENNY OR SUSAN!</h1>
          <div className="admin-button-flex-container">
            <div className="admin-btn-flex-column">
              <button 
                className="circle-btn" 
                onClick={this.pushHistoryToEditCalculatorInfo}
              >
                Edit Calculators
              </button>
            </div>
            <div className="admin-btn-flex-column">
              <button 
                className="circle-btn" 
                onClick={this.pushHistoryToEditUserInfo}
              >
                Edit User Information
              </button>
            </div>
            <div className="admin-btn-flex-column">
              <button 
                className="circle-btn" 
                onClick={this.pushHistoryToEditIndustryInfo}
              >
                Edit Industries
              </button>
            </div>
            <div className="admin-btn-flex-column">
              <button 
                className="circle-btn" 
                onClick={this.addAdmin}
              >
                Add Admin
              </button>
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