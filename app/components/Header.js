import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import LibrarySearch from './LibrarySearch';
import Button from './Button';
import auth from '../actions/auth';

class Header extends React.Component {

  constructor() {
      super();
      this.logout = this.logout.bind(this)
  }

  logout() {
    this.props.dispatch(auth.logout())
  }

  render() {

    return (<div className="row header">
      <div className="six columns">
        <Link to="/">
          <img className="logo u-max-full-width " src="./img/NL_logo_white_alpha.png" />
        </Link>
      </div>
      <div className="six columns">
      {this.props.isAuthorized ? <span><i className="fa fa-user"></i> {this.props.user.fullname}</span> : ""}
      </div>

      { this.props.isAuthorized ?
      <div className="six columns">
        <div className="nav">
          <Link to="/library">
            <Button
                text="library"
                type="nav-btn"
                icon="fa fa-book"
            />
          </Link>
          <Link to="/search">
            <Button
                text="add book"
                type="nav-btn"
                icon="fa fa-search"
            />
          </Link>
          <Button
                handleClick={this.logout}
                text="logout"
                type="nav-btn"
                icon="fa fa-sign-out"
          />
        </div>
      </div>
        : null }
    </div>);
  }
}

export default connect(
    (state)=> {
      return {
        isAuthorized: state.auth.isAuthorized,
        user: state.auth.user,
        token: state.auth.token,
      }
    },
    (dispatch)=> {
        return {
            dispatch
        }
    }
)(Header)
