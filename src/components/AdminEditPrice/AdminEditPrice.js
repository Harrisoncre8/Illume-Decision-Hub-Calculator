import React, {Component} from 'react';
import {connect} from 'react-redux';

class AdminEditPrice extends Component{

  state = {

  }

  componentDidMount(){
    this.props.dispatch({type: `GET_ADMIN_QUESTION`});
  }

  componentDidUpdate(prevProps){
    if(this.props.question !== prevProps.question){
      this.setState({...this.props.question});
    }
  }

  render(){
    return(
      <div className="main-container">
        {JSON.stringify(this.state)}
        {JSON.stringify(this.props.question)}
        <h1 className="main-heading">Edit Price Setting Calculator</h1>
        {/* {this.props.question.map(q =>
          <div key={q.id}>
            <input type="text" value={this.state.sales} onChange={this.handleChange(event, )} />
          </div>
        )} */}
      </div>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  question: reduxState.admin.adminQuestion
});

export default connect(putReduxStateOnProps)(AdminEditPrice);