import React, {Component} from 'react';
import {connect} from 'react-redux';
import './AdminEditIndustry.css';
import Modal from 'react-awesome-modal';
import Nav from '../Nav/Nav';

class AdminEditIndustry extends Component{

  // Store local state
  state = {
    visible: false,
    industry: '',
    selectedIndustry: {
      id: '',
      industry: '',
      margin: ''
    },
    newIndustry: {
      industry: '',
      margin: ''
    }
  }

  // GET data from industry table on load
  componentDidMount(){
    this.props.dispatch({type: `GET_ADMIN_INDUSTRY`});
  }

  // Adds class if input has a value, removes the class if input has no value
  checkForValue = e => e.target.value ? e.target.classList.add('text-field-active') : e.target.classList.remove('text-field-active');

  // Close modal popup, reset local state
  closeModal = () => {
    this.setState({
      visible : false,
      industry: '',
      selectedIndustry: {
        id: '',
        industry: '',
        margin: ''
      },
      newIndustry: {
        industry: '',
        margin: ''
      }
    });
  }

  // Ask for confirmation, then dispatch DELETE request to saga
  handleDelete = id => {
    let popup = window.confirm(`Are you sure you want to disable ${id.industry}?`);
    if(popup){
      this.props.dispatch({type: `DELETE_ADMIN_INDUSTRY_INFO`, payload: id.id});
    }
  }

  // Update local state on input value change in edit modal
  handleEditChange = (e, propName) => {
    this.setState({
      selectedIndustry: {
        ...this.state.selectedIndustry,
        [propName]: e.target.value
      }
    });
    this.checkForValue(e);
  }

  // Update local state on input value change for new industry
  handleNewChange = (e, propName) => {
    this.setState({
      newIndustry: {
        ...this.state.newIndustry,
        [propName]: e.target.value
      }
    });
    this.checkForValue(e);
  }

  // Dispatch new industry to saga
  handlePost = () => {
    this.props.dispatch({type: `POST_ADMIN_INDUSTRY_INFO`, payload: this.state.newIndustry});
    this.closeModal();
  }

  // Dispatch edited industry to saga
  handleSave = () => {
    this.props.dispatch({type: `PUT_ADMIN_INDUSTRY_INFO`, payload: this.state.selectedIndustry});
    this.closeModal();
  }

  // Open modal popup, populate inputs with selected industry data from local state
  openModal = industry => {
    if(!industry.target){
      this.setState({
        visible: true,
        industry: industry.industry,
        selectedIndustry: {
          ...industry,
          margin: industry.margin*100
        }
      });
    }
    else {
      this.setState({visible: true});
    }
  }

  // Return to admin page
  pushHistoryBack = () => this.props.history.push('/admin');

  render(){
    let editIndustry = this.state.selectedIndustry;
    let newIndustry = this.state.newIndustry;

    return(
      <center>
        <Nav />
        <div className="main-container">
          <div className="top-card-container">
            <button className="close-window-button" onClick={this.pushHistoryBack}>x</button>
            <h1 className="main-heading admin-industry-heading">Industry Information</h1>
            <button className="normal-btn admin-industry-add-btn" onClick={this.openModal}>Add New Industry</button>
            <table className="admin-industry-table">
              <thead>
                <tr>
                  <th>Industry</th>
                  <th>Margin</th>
                  <th>Enabled?</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.props.industry.map(industry => 
                  <>
                    {industry.enabled ?
                      <tr key={industry.id}>
                        <td>{industry.industry}</td>
                        <td>{industry.margin * 100}%</td>
                        <td>Yes</td>
                        {industry.enabled ?
                          <td 
                            className="admin-delete-industry-cell" 
                            onClick={()=>this.handleDelete(industry)}
                          >
                            DISABLE
                          </td>
                          :
                          <td 
                            className="admin-delete-industry-cell" 
                            onClick={()=>this.handleDelete(industry)}
                          >
                            ENABLE
                          </td>
                        }
                        <td 
                          className="admin-edit-industry-cell" 
                          onClick={()=>this.openModal(industry)}
                        >
                          Edit Info
                        </td>
                      </tr>
                      :
                      <tr id="admin-industry-disabled" key={industry.id}>
                        <td>{industry.industry}</td>
                        <td>{industry.margin * 100}%</td>
                        <td>No</td>
                        {industry.enabled ?
                          <td 
                            className="admin-delete-industry-cell" 
                            onClick={()=>this.handleDelete(industry)}
                          >
                            DISABLE
                          </td>
                          :
                          <td 
                            className="admin-delete-industry-cell" 
                            onClick={()=>this.handleDelete(industry)}
                          >
                            ENABLE
                          </td>
                        }
                        <td 
                          className="admin-edit-industry-cell" 
                          onClick={()=>this.openModal(industry)}
                        >
                          Edit Info
                        </td>
                      </tr>
                    }
                  </>
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
              {this.state.industry ? 
                <div className="modal-container">
                  <button className="close-window-button" onClick={this.closeModal}>x</button>
                  <h1 className="main-heading modal-heading">{this.state.industry}</h1>
                  
                  <div className="text-field-container">
                    <input 
                      className="text-field text-field-active" 
                      type="text" 
                      value={editIndustry.industry}
                      onChange={(event)=>this.handleEditChange(event, 'industry')}
                    />
                    <label className="text-field-label">industry</label>
                    <div className="text-field-mask admin-industry-mask-industry"></div>
                  </div>

                  <div className="text-field-container">
                    <input 
                      className="text-field text-field-active" 
                      type="text" 
                      value={editIndustry.margin} 
                      onChange={(event)=>this.handleEditChange(event, 'margin')}
                    />
                    <label className="text-field-label">margin (%)</label>
                    <div className="text-field-mask admin-industry-mask-margin"></div>
                  </div>

                  <div className="modal-btn-container">
                    <button className="normal-btn" onClick={this.handleSave}>Save</button>
                  </div>
                </div>

                :

                <div className="modal-container">
                  <button className="close-window-button" onClick={this.closeModal}>x</button>
                  <h1 className="main-heading modal-heading">Add New Industry</h1>
                  
                  <div className="text-field-container">
                    <input 
                      className="text-field" 
                      type="text" 
                      value={newIndustry.industry}
                      onChange={(event)=>this.handleNewChange(event, 'industry')}
                    />
                    <label className="text-field-label">industry</label>
                    <div className="text-field-mask admin-industry-mask-industry"></div>
                  </div>

                  <div className="text-field-container">
                    <input 
                      className="text-field" 
                      type="text" 
                      value={newIndustry.margin} 
                      onChange={(event)=>this.handleNewChange(event, 'margin')}
                    />
                    <label className="text-field-label">margin (%)</label>
                    <div className="text-field-mask admin-industry-mask-margin"></div>
                  </div>

                  <div className="modal-btn-container">
                    <button className="normal-btn" onClick={this.handlePost}>Add New</button>
                  </div>
                </div>
              }
              
            </Modal>
          </div>
        </div>
      </center>
    );
  }
}

const putReduxStateOnProps = reduxState => ({
  industry: reduxState.adminIndustry,
});

export default connect(putReduxStateOnProps)(AdminEditIndustry);