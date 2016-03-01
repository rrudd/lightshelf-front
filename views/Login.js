import React from 'react';
import Button from '../components/Button';

export default class Login extends React.Component {

  handleClick() {
    const username = this.refs.username;
    const password = this.refs.password;
    const creds = {
      username: username.value.trim(),
      password: password.value.trim(),
    };
    dispatch(loginUser(creds));
  }

  render() {
    const { errorMessage } = this.props;

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
            handleClick={(event) => this.handleClick(event)}
            type="btn btn-netlight-primary"
            icon="fa fa-sign-in"
            text="Login"
          />
        </div>

        {errorMessage &&
          <p>{errorMessage}</p>
        }
      </div>
    );
  }
}

Login.propTypes = {
  onLoginClick: React.PropTypes.func.isRequired,
  errorMessage: React.PropTypes.string,
};
