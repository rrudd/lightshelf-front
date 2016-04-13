import React from 'react';
import Loader from '../components/Loader';
import Button from './Button';
import StatusIcon from './StatusIcon';
import StatusMessage from './StatusMessage';
import { connect } from 'react-redux';
import actions from '../actions/books.js';
const { borrow, returnBook, add } = actions;
import CONSTANTS from '../constants';

class BookCard extends React.Component {
  constructor() {
    super();
    this.state = { added: false };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    if (this.props.purpose === 'add') {
      this.setState({added: true});
      this.props.dispatch(add(this.props.item, this.props.token))
    }
    else if (this.props.purpose === 'borrow') {
      this.props.dispatch(borrow(this.props.item, this.props.token));
    }
    else if (this.props.purpose === 'return') {
      this.props.dispatch(returnBook(this.props.item, this.props.item.current_loan._id, this.props.token));
    }
  }

  render() {
    const book = this.props.item,
        loan = book.current_loan,
        user = this.props.user,
        actionAvailable = loan !== null && user.id !== loan.user._id;

    book.imageLinks = book.imageLinks ? book.imageLinks : {};
    book.authors = book.authors ? book.authors : ['Unknown author'];
    book.id = this.props.identifier;
    const authorString = (book.authors !== []) ? book.authors.join(', ') : '';
    let action = this.props.purpose;

    if (loan) {
      action = 'return';
    }

    let addedMessage = {
      message: 'Added',
      icon: 'fa fa-check'
    };

    const loading = this.props.status === 'loading'
          && this.props.target._id === book._id
          && (this.props.action === CONSTANTS.BOOKS.BORROW.REQUEST ||
              this.props.action === CONSTANTS.BOOKS.RETURN.REQUEST);

    const icon = (action === 'add') ? 'fa fa-plus' : '';
    return (
      <div className="card row" id={book.id}>
        <div className="three columns centralize card-field">
          <img
            className="thumb-s"
            src={book.imageLinks.thumbnail}
          ></img>
        </div>
        <div className="six columns card-field">
          <div><b>{book.title}</b></div>
          <div>{authorString}</div>
        </div>
        { (loading) ? <Loader /> :
          <div className="three columns centralize card-field">
            {action !== 'add' ? <StatusIcon loan={loan} user={user} /> : null}
            { !this.state.added ? <Button
              text={action}
              icon={icon}
              handleClick={this.clickHandler}
              requireConfirm={true}
              disabled={actionAvailable}
            /> : <StatusMessage contents={addedMessage}/>}
          </div>
        }
      </div>
    );
  }
}

BookCard.propTypes = {
  item: React.PropTypes.object,
  identifier: React.PropTypes.string,
  purpose: React.PropTypes.string,
};


export default connect(
    (state)=> {
      return {
        token: state.auth.token,
        action: state.books.action,
        status: state.books.status,
        target: state.books.target || {},
        user : state.auth.user,
      }
    },
    (dispatch)=> {
      return {
        dispatch
      }
    }
)(BookCard)
