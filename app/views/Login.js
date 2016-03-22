import React from 'react';
import {connect} from 'react-redux';
import Button from '../components/Button';
import auth from '../actions/auth';
import go from '../actions/router';

class Login extends React.Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if(this.props.isAuthorized) {
      this.props.dispatch(auth.loginSuccess(this.props.token))
    }
  }

  handleSubmit() {
    const username = this.refs.username;
    const password = this.refs.password;

    const creds = {
      username: username.value.trim(),
      password: password.value.trim()
    };

    this.props.dispatch(auth.login(creds));
  }

  onGoToRegistration(e) {
    e.preventDefault();
    this.props.dispatch(go('register'))
  }

  render() {
    const errorMessage = this.props.message;

    return (
      <div className="row first-component centralize">
        <form onSubmit={this.handleSubmit}>
        <div className="nine columns">

          <h1>Login</h1>
          <div className="row">
            <input
              type="text"
              ref="username"
              className="form-control u-full-width"
              placeholder="Username"
              autoFocus={true}
            />
          </div>
          <div className="row">
            <input
              type="password"
              ref="password"
              className="form-control u-full-width"
              placeholder="Password"
            />
          </div>


          <p style={{color: 'red'}}>{errorMessage}</p>

        </div>
        <div className="three columns">

          <button type="submit" className="btn btn-netlight-primary">
            <i className="fa fa-sign-in"></i> Login
          </button>

        </div>

        <span style={{fontSize: '0.8em'}}>Not registered? Register <a href="#" onClick={(e)=> this.onGoToRegistration(e)}>here</a></span>
        </form>
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
