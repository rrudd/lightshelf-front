import React from 'react';
import BookCard from '../components/BookCard';

export default class Library extends React.Component {
  constructor() {
    super();
    this.state = { books: [] };
  }
  componentDidMount() {
    $.get('http://localhost:3333/api/books', data =>
      this.setState({ books: data }));
  }
  render() {
    let books = [];
    books = this.state.books.map((book) =>
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
            {books}
          </div>
        </div>
      </div>
    );
  }
}
