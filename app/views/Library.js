import React from 'react';
import BookCard from '../components/BookCard';
import Loader from '../components/Loader';
import { connect } from 'react-redux';
import actions from '../actions/books.js';
import CONSTANTS from '../constants';

class Library extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    if (this.props.status !== CONSTANTS.BOOKS.LIST.SUCCESS) {
      this.props.dispatch(actions.list(this.props.token));
    }
  }

  render() {
    let books = [];
    const loading = this.props.status === 'loading';
    books = this.props.books.map((book) =>
      <BookCard
        key={book.id}
        item={book}
        identifier={book.id}
        purpose={book.current_loan ? 'return' : 'borrow'}
      />);
    return (
      <div className="first-component">
        <div id="booklist" className="booklist row">
          <div className="twelve columns">
            {(loading) ? <Loader /> : books}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    status: state.books.status,
    action: state.books.action,
    books: state.books.books || [],
    token: state.auth.token,
  }),
  (dispatch) => ({
    dispatch,
  })
)(Library);
