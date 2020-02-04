import React, {Component} from 'react';
import {connect} from 'react-redux';

class AdminEditPrice extends Component{

  render(){
    return(
      <div className="main-container">
        <h1 className="main-heading">Edit Price Setting Calculator</h1>
      </div>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.OBJECT
});

export default connect(putReduxStateOnProps)(AdminEditPrice);