import React, {Component} from 'react';
import {connect} from 'react-redux';
import './AdminEditIndustry.css';
import Modal from 'react-awesome-modal';

class AdminEditIndustry extends Component{

  state = {
    visible: false,
    industry: '',
    selectedIndustry: {
      id: '',
      industry: '',
      margin: ''
    }
  }

  componentDidMount(){
    this.props.dispatch({type: `GET_INDUSTRY`});
  }

  // Adds class if input has a value, removes the class if input has no value
  checkForValue = e => e.target.value ? e.target.classList.add('text-field-active') : e.target.classList.remove('text-field-active');

  closeModal = () => {
    this.setState({visible : false});
  }

  handleChange = (e, propName) => {
    this.setState({
      selectedIndustry: {
        ...this.state.selectedIndustry,
        [propName]: e.target.value
      }
    });
    this.checkForValue(e);
  }

  handleSave = () => {
    this.props.dispatch({type: `PUT_ADMIN_INDUSTRY_INFO`, payload: this.state.selectedIndustry});
  }

  openModal = industry => {
    this.setState({
      visible: true,
      industry: industry.industry,
      selectedIndustry: {
        ...industry
      }
    });
  }

  pushHistoryBack = () => {
    this.props.history.push('/admin');
  }

  render(){
    let editIndustry = this.state.selectedIndustry;

    return(
      <center>
        <div className="main-container">
          <button className="close-window-button" onClick={this.pushHistoryBack}>x</button>
          <h1 className="main-heading admin-industry-heading">Industry Information</h1>
          <table className="admin-industry-table">
            <thead>
              <tr>
                <th>Industry</th>
                <th>Margin</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.props.industry.map(industry => 
                <tr key={industry.id}>
                  <td>{industry.industry}</td>
                  <td>{industry.margin * 100}%</td>
                  <td className="admin-edit-industry-cell" onClick={()=>this.openModal(industry)}>Edit Info</td>
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
              <button className="close-window-button" onClick={this.closeModal}>x</button>
              <h1 className="main-heading modal-heading">{this.state.industry}</h1>
              
              <div className="admin-industry-text-field-container">
                <input 
                  className="text-field admin-industry-text-field-industry text-field-active" 
                  type="text" 
                  value={editIndustry.industry}
                  onChange={(event)=>this.handleChange(event, 'industry')}
                />
                <label className="text-field-label admin-industry-label-industry">industry</label>
                <div className="text-field-mask admin-industry-mask-industry"></div>
              </div>

              <div className="admin-industry-text-field-container">
                <input 
                  className="text-field admin-industry-text-field-margin text-field-active" 
                  type="text" 
                  value={editIndustry.margin} 
                  onChange={(event)=>this.handleChange(event, 'margin')}
                />
                <label className="text-field-label admin-industry-label-margin">margin (%)</label>
                <div className="text-field-mask admin-industry-mask-margin"></div>
              </div>

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
});

export default connect(putReduxStateOnProps)(AdminEditIndustry);