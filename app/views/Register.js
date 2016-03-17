import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import actions from '../actions/auth';
const { register } = actions;
import go from '../actions/router';

class Register extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let username = ReactDOM.findDOMNode(this.refs.username).value;
    let password = ReactDOM.findDOMNode(this.refs.password).value;

    this.props.dispatch(register({ username, password }))
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
            </div>
            <div className="three columns">
              <button type="submit" className="button-primary-netlight">
                <i className=""></i> Submit
              </button>
            </div>
          </div>
          <div className="row">
            <span>Allready registered? Login <a href="#" onClick={(e)=> this.onGoToLogin(e)}>here</a></span>
          </div>
          <div className="row">{this.props.message}</div>
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
