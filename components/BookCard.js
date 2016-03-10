import React from 'react';
import BookModal from './BookModal';
import Button from './Button';
import StatusIcon from './StatusIcon';

export default class SearchResult extends React.Component {
  constructor() {
    super();
    this.state = { modalIsOpen: false };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const book = this.props.item;
    book.imageLinks = book.imageLinks ? book.imageLinks : {};
    book.authors = book.authors ? book.authors : ['Unknown author'];
    book.id = this.props.identifier;
    const authorString = (book.authors !== []) ? book.authors.join(', ') : '';
    let action = this.props.purpose;
    let activeLoan = false;

    if (book.current_loan) {
      activeLoan = true;
      action = 'return';
    }

    const icon = (action === 'add') ? 'fa fa-plus' : '';
    return (
      <div className="card row" id={book.id}>
        <div className="three columns centralize card-field">
          <img
            className="thumb-s"
            src={book.imageLinks.smallThumbnail}
          ></img>
        </div>
        <div className="six columns card-field">
          <div><b>{book.title}</b></div>
          <div>{authorString}</div>
        </div>
        <div className="three columns centralize card-field">
          {action !== 'add' ? <StatusIcon active={activeLoan} /> : null}
          <Button
            text={action}
            icon={icon}
            handleClick={this.openModal}
          />
          <BookModal
            book={book}
            loanID = {book.current_loan}
            action={action}
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
          />
        </div>
      </div>
    );
  }
}

SearchResult.propTypes = {
  item: React.PropTypes.object,
  identifier: React.PropTypes.string,
  purpose: React.PropTypes.string,
};
