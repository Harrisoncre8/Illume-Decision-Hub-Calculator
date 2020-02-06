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
    },
    newIndustry: {
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

  handleEditChange = (e, propName) => {
    this.setState({
      selectedIndustry: {
        ...this.state.selectedIndustry,
        [propName]: e.target.value
      }
    });
    this.checkForValue(e);
  }

  handleNewChange = (e, propName) => {
    this.setState({
      newIndustry: {
        ...this.state.newIndustry,
        [propName]: e.target.value
      }
    });
    this.checkForValue(e);
  }

  handlePost = () => {
    this.props.dispatch({type: `POST_ADMIN_INDUSTRY_INFO`, payload: this.state.newIndustry});
  }

  handleSave = () => {
    this.props.dispatch({type: `PUT_ADMIN_INDUSTRY_INFO`, payload: this.state.selectedIndustry});
  }

  openModal = industry => {
    if(!industry.target){
      this.setState({
        visible: true,
        industry: industry,
        selectedIndustry: {
          ...industry
        }
      });
    }
    else {
      this.setState({visible: true});
    }
  }

  pushHistoryBack = () => {
    this.props.history.push('/admin');
  }

  render(){
    let editIndustry = this.state.selectedIndustry;
    let newIndustry = this.state.newIndustry;

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
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.props.industry.map(industry => 
                <tr key={industry.id}>
                  <td>{industry}</td>
                  <td>{industry.margin * 100}%</td>
                  <td className="admin-edit-industry-cell" onClick={()=>this.openModal(industry)}>Edit Info</td>
                  <td className="admin-edit-industry-cell" onClick={this.openModal}>Add New Industry</td>
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
            {this.state.industry ? 
              <div className="modal-container">
                <button className="close-window-button" onClick={this.closeModal}>x</button>
                <h1 className="main-heading modal-heading">{this.state.industry}</h1>
                
                <div className="admin-industry-text-field-container">
                  <input 
                    className="text-field admin-industry-text-field-industry text-field-active" 
                    type="text" 
                    value={editIndustry.industry}
                    onChange={(event)=>this.handleEditChange(event, 'industry')}
                  />
                  <label className="text-field-label admin-industry-label-industry">industry</label>
                  <div className="text-field-mask admin-industry-mask-industry"></div>
                </div>

                <div className="admin-industry-text-field-container">
                  <input 
                    className="text-field admin-industry-text-field-margin text-field-active" 
                    type="text" 
                    value={editIndustry.margin} 
                    onChange={(event)=>this.handleEditChange(event, 'margin')}
                  />
                  <label className="text-field-label admin-industry-label-margin">margin (%)</label>
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
                
                <div className="admin-industry-text-field-container">
                  <input 
                    className="text-field admin-industry-text-field-industry" 
                    type="text" 
                    value={newIndustry.industry}
                    onChange={(event)=>this.handleNewChange(event, 'industry')}
                  />
                  <label className="text-field-label admin-industry-label-industry">industry</label>
                  <div className="text-field-mask admin-industry-mask-industry"></div>
                </div>

                <div className="admin-industry-text-field-container">
                  <input 
                    className="text-field admin-industry-text-field-margin" 
                    type="text" 
                    value={newIndustry.margin} 
                    onChange={(event)=>this.handleNewChange(event, 'margin')}
                  />
                  <label className="text-field-label admin-industry-label-margin">margin (%)</label>
                  <div className="text-field-mask admin-industry-mask-margin"></div>
                </div>

                <div className="modal-btn-container">
                  <button className="normal-btn" onClick={this.handlePost}>Add New</button>
                </div>
              </div>
            }
            
          </Modal>
        </div>
      </center>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  industry: reduxState.industry,
});

export default connect(putReduxStateOnProps)(AdminEditIndustry);