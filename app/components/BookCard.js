import React from 'react';
import BookModal from './BookModal';
import Button from './Button';
import StatusIcon from './StatusIcon';
import StatusMessage from './StatusMessage';
import { connect } from 'react-redux';
import actions from '../actions/books.js';
const { borrow, returnBook, add } = actions;

class BookCard extends React.Component {
  constructor() {
    super();
    this.state = { added: false };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    let k = 1;
    if (this.props.purpose === 'add') {
      this.setState({added: true});
      this.props.dispatch(add(this.props.item, this.props.token))
    }
    else if (this.props.purpose === 'borrow') {
      this.props.dispatch(borrow(this.props.item, this.props.token));
    }
    else if (this.props.purpose === 'return') {
      this.props.dispatch(returnBook(this.props.item, this.props.item.current_loan, this.props.token));
    }
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

    let addedMessage = {
      message: 'Added',
      icon: 'fa fa-check'
    };

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
          { !this.state.added ? <Button
            text={action}
            icon={icon}
            handleClick={this.clickHandler}
            requireConfirm={true}
          /> : <StatusMessage contents={addedMessage}/>}
        </div>
      </div>
    );
  }
}

BookCard.propTypes = {
  item: React.PropTypes.object,
  identifier: React.PropTypes.string,
  purpose: React.PropTypes.string
};


export default connect(
    (state)=> {
      return {
        token: state.auth.token
      }
    },
    (dispatch)=> {
      return {
        dispatch
      }
    }
)(BookCard)