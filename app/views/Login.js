import React from 'react';
import {connect} from 'react-redux';
import Button from '../components/Button';
import auth from '../actions/auth';

class Login extends React.Component {

  componentWillMount() {
    if(this.props.isAuthorized) {
      this.props.dispatch(auth.loginSuccess(this.props.token))
    }
  }

  onLoginClick() {
    const username = this.refs.username;
    const password = this.refs.password;

    const creds = {
      username: username.value.trim(),
      password: password.value.trim()
    };

    this.props.dispatch(auth.login(creds));

  }

  render() {
    const errorMessage = this.props.message;

    return (
      <div className="row first-component centralize">
        <div className="nine columns">
          <div className="row"></div>
            <input
              type="text"
              ref="username"
              className="form-control u-full-width"
              placeholder="Username"
            />
          <div className="row">
            <input
              type="password"
              ref="password"
              className="form-control u-full-width"
              placeholder="Password"
            />
          </div>
        </div>
        <div className="three columns">
          <Button
            handleClick={(event) => this.onLoginClick(event)}
            type="btn btn-netlight-primary"
            icon="fa fa-sign-in"
            text="Login"
          />
        </div>

        <p>{errorMessage}</p>

      </div>
    );
  }
}

const mapStateToProps = (state)=> {
      return {
        isAuthorized: state.auth.isAuthorized || false,
        message: state.auth.message,
        token: state.auth.token
      }
    },
    mapDispatchToProps = (dispatch)=> {
      return {
        dispatch
      }
    };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
