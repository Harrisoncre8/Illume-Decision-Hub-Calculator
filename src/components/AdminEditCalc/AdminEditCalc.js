import React, {Component} from 'react';
import {connect} from 'react-redux';

class AdminEditCalc extends Component{

  render(){
    return(
      <>
      </>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  calculator: reduxState.OBJECT
});

export default connect(putReduxStateOnProps)(AdminEditCalc);