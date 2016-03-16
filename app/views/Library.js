import React from 'react';
import BookCard from '../components/BookCard';
import Loader from '../components/Loader';
import { connect } from 'react-redux';
import actions from '../actions/books.js';

class Library extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.dispatch(actions.list(this.props.token))
  }

  render() {
    let books = [];
    let loading =  this.props.status === 'loading';
    books = this.props.books.map((book) =>
      <BookCard
        key={book.id}
        item={book}
        identifier={book.id}
        purpose="borrow"
      />);
    return (
      <div className="first-component">
        <div id="booklist" className="booklist row">
          <div className="twelve columns">
            {(loading && books === []) ? <Loader /> : books}
          </div>
        </div>
      </div>
    );
  }
}


export default connect(
    (state)=> {
      return {
        status: state.books.status,
        books: state.books.books || [],
        token: state.auth.token
      }
    },
    (dispatch)=> {
      return {
        dispatch
      }
    }
)(Library);
