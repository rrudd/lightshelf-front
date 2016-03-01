import React from 'react';
import ReactDOM from 'react-dom';

export default class Register extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { statusMsg: '' };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ statusMsg: '' });
    let username = ReactDOM.findDOMNode(this.refs.username).value;
    let password = ReactDOM.findDOMNode(this.refs.password).value;

    $.post('http://localhost:3333/api/auth/register', { username, password })
      .done(data => {
        this.setState({ statusMsg: data.message });
      }).fail(jqxhr => {
        this.setState({ statusMsg: JSON.parse(jqxhr.responseText).message });
      });
    username = '';
    password = '';
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
          <div className="row">{this.state.statusMsg}</div>
        </form>
      </div>
    </div>);
  }
}
