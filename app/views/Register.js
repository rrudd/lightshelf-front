import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import actions from '../actions/auth';
const { register } = actions;
import go from '../actions/router';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {message: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let password = ReactDOM.findDOMNode(this.refs.password).value,
        password2 = ReactDOM.findDOMNode(this.refs.password2).value;
    if(password !== password2) {
      this.setState({message: "Passwords doesn't match"});
      return;
    }
    else {
      this.setState({message: ""});
    }
    let fullname = ReactDOM.findDOMNode(this.refs.fullname).value,
        username = ReactDOM.findDOMNode(this.refs.username).value;

    this.props.dispatch(register({ fullname, username, password }))
  }

  onGoToLogin(e) {
    e.preventDefault();
    this.props.dispatch(go('login'))
  }

  render() {
    return (
    <div className="row first-component">
      <div className="twelve columns centralize">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="nine columns">
              <input
                  type="text"
                  name="fullname"
                  className="u-full-width"
                  placeholder="Full name"
                  ref="fullname"
              />
              <input
                type="text"
                name="username"
                className="u-full-width"
                placeholder="Username"
                ref="username"
              />
              <input
                type="password"
                name="password"
                className="u-full-width"
                placeholder="Password"
                ref="password"
              />
              <input
                  type="password"
                  name="password2"
                  className="u-full-width"
                  placeholder="Confirm password"
                  ref="password2"
              />
            </div>

            <div className="row" style={{marginBottom: '1rem', color: 'red'}}>
              {this.props.message}
              {this.state.message}
            </div>

            <div className="three columns">
              <button type="submit" className="button-primary-netlight">
                <i className=""></i> Submit
              </button>
            </div>
          </div>
          <div className="row">
            <span style={{fontSize: '0.8em'}}>Allready registered? Login <a href="#" onClick={(e)=> this.onGoToLogin(e)}>here</a></span>
          </div>
        </form>
      </div>
    </div>);
  }
}

export default connect(
    (state)=> {
      return {
        message: state.auth.message || ''
      }
    },
    (dispatch)=> {
      return {
        dispatch
      }
    }
)(Register)
