import React from 'react';
import { connect } from 'react-redux';
import Header from './components/Header';

class App extends React.Component {

  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props;
    return (
      <div>
        <Header />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  isAuthenticated: React.PropTypes.bool.isRequired,
  errorMessage: React.PropTypes.string
};

function mapStateToProps(state) {
  const { auth } = state;
  const { isAuthenticated, message } = auth;

  return {
    isAuthenticated,
    message
  };
}

export default connect(mapStateToProps)(App);
