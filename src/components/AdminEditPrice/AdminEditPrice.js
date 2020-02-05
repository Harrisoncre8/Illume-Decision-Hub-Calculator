import React, {Component} from 'react';
import {connect} from 'react-redux';
import AdminCalcQuestion from '../AdminCalcQuestion/AdminCalcQuestion';

class AdminEditPrice extends Component{

  componentDidMount(){
    this.props.dispatch({type: `GET_ADMIN_QUESTION`});
  }

  render(){
    return(
      <div className="main-container">
        {JSON.stringify(this.props.question)}
        <h1 className="main-heading">Edit Price Setting Calculator</h1>
        {this.props.question.map(q =>
          <div key={q.id}>
            <AdminCalcQuestion id={q.id} question={q.question} tooltip={q.help_text} />
          </div>
        )}
      </div>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  question: reduxState.admin.adminQuestion
});

export default connect(putReduxStateOnProps)(AdminEditPrice);