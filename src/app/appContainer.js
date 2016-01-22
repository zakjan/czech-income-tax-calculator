import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import App from './app.js';
import actions from 'services/actions.js';


const mapStateToProps = (state) => {
  return state.toJS();
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

const AppContainer = (props) => {
  return (
    <App {...props} />
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
