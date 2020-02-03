import React, {Component} from 'react';
import {connect} from 'react-redux';

class AdminEditUserInfo extends Component{

  render(){
    return(
      <>
      </>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.OBJECT
});

export default connect(putReduxStateOnProps)(AdminEditUserInfo);