import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import LibrarySearch from './LibrarySearch';
import Button from './Button';
import auth from '../actions/auth';
import search from '../actions/search';
import books from '../actions/books';

class Header extends React.Component {

  constructor() {
      super();
      this.logout = this.logout.bind(this)
  }

  logout() {
    this.props.dispatch(auth.logout())
  }

  findInLibrary = (text) => {
    if (text) {
      this.props.dispatch(search.findBook(text, this.props.token));
    } else {
      this.props.dispatch(books.list(this.props.token));
    }
  }

  render() {

    return (<div className="row header">
      <div className="six columns">
        <Link to="/">
          <img className="logo u-max-full-width " src="./img/EPS_RGB_WHITE_10.png" />
        </Link>
      </div>
      { this.props.isAuthorized ?
      <div className="six columns">
        <div className="nav">
          <LibrarySearch searchSubmit={this.findInLibrary}/>
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
                text=""
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
        token: state.auth.token,
      }
    },
    (dispatch)=> {
        return {
            dispatch
        }
    }
)(Header)
