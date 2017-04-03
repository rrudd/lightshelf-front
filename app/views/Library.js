import React from 'react';
import BookCard from '../components/BookCard';
import Loader from '../components/Loader';
import LibrarySearch from '../components/LibrarySearch';
import { connect } from 'react-redux';
import CONSTANTS from '../constants';
import search from '../actions/search';
import books from '../actions/books';

class Library extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    if (this.props.status !== CONSTANTS.BOOKS.LIST.SUCCESS) {
      this.props.dispatch(books.list(this.props.token));
    }
  }

  findInLibrary = (text) => {
    if (text) {
      this.props.dispatch(search.findBook(text, this.props.token));
    } else {
      this.props.dispatch(books.list(this.props.token));
    }
  }

  render() {
    let books = [];
    const loading = this.props.status === 'loading' && this.props.action === CONSTANTS.BOOKS.LIST.REQUEST;
    if (this.props.books && this.props.books.length > 0) {
      books = this.props.books.map((book) =>
        <BookCard
          key={book.id}
          item={book}
          identifier={book.id}
          purpose={book.current_loan ? 'return' : 'borrow'}
        />);
    } else {
      books =  (
        <div className="row centralize">
          <h5>No books found</h5>
        </div>
      );
    }
    return (
      <div className="first-component">
        <LibrarySearch searchSubmit={this.findInLibrary} />
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
