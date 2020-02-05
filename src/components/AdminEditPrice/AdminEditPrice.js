import React, {Component} from 'react';
import {connect} from 'react-redux';
import './AdminEditPrice.css';
import AdminCalcQuestion from '../AdminCalcQuestion/AdminCalcQuestion';

class AdminEditPrice extends Component{

  componentDidMount(){
    this.props.dispatch({type: `GET_ADMIN_QUESTION`, payload: 3});
  }

  render(){
    return(
      <div className="main-container">
        <h1 className="main-heading">Edit Price Setting Calculator</h1>
        <div>
          <span className="admin-price-q">Question</span>
          <span className="admin-price-tooltip">Tooltip</span>
        </div>
        <div>
          {this.props.question.map(q =>
            <div key={q.id}>
              <AdminCalcQuestion id={q.id} question={q.question} tooltip={q.help_text} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  question: reduxState.admin.adminQuestion
});

export default connect(putReduxStateOnProps)(AdminEditPrice);