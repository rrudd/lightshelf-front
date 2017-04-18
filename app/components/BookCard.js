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
    this.state = { added: false,  expandDescription: false};
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    let action = this.getAction(this.isBorrowedByMe(this.props.item.loans));

    if (action === 'add') {
      this.setState({added: true});
      this.props.dispatch(add(this.props.item, this.props.token, arguments[0].numberOfCopies))
    }
    else if (action === 'borrow') {
      this.props.dispatch(borrow(this.props.item, this.props.token));
    }
    else if (action === 'return') {
      this.props.dispatch(returnBook(this.props.item, this.props.item.current_loan._id, this.props.token));
    }
  }

  expandDescriptionClick = () => {
    let toggle = !this.state.expandDescription;
    this.setState({expandDescription: toggle});
  }

  numberOfBooksAvailableForLoan = (loans) => {
    let count = 0;
    if (loans) {
      loans.forEach((loan) => {
        if (loan === null) count++;
      })

    }
    return count;
  }

  isBorrowedByMe = (loans) => {
    let isBorrowedByMe = [];
    if (loans) {
      isBorrowedByMe = loans.filter((loan) => {
        return (loan !== null && (loan.user._id === this.props.user.id));
      });
    }
    return isBorrowedByMe.length > 0;
  }

  isAnyCopyAvailable = (loans) => {
    let result = false;
    if (loans) {
      loans.forEach((loan) => {
        if (loan === null) result= true;
      });
    }
    return result;
  }

  getAction = (isBorrowedByMe) => {
    if (this.props.purpose) {
      return this.props.purpose;
    } else {
      return isBorrowedByMe ? 'return' : 'borrow';
    }
  }

  getDescription = () => {
    let bookDescription = this.props.item.bookInfo.description;
    if (this.state.expandDescription) {
      return bookDescription;

    } else {
      if (bookDescription) {
        let trimmedDesc = bookDescription.substring(0, 145);
        return trimmedDesc.substring(0, trimmedDesc.lastIndexOf(" ")) + "...";
      } else return "";
    }
  }

  getCurrentLoans = () => {
    let loanRows = [];
    if (this.props.item) {
      this.props.item.loans.forEach((loan) => {
        if (loan !== null) {
          loanRows.push(<li key={loan.user._id}>{loan.user.fullname}</li>)
        }
      })

    }
    if (loanRows.length > 0) {
      return (
        <div>
          <br></br>
          <strong>Current loans:</strong>
          <ul>{loanRows}</ul>
        </div>
      )
    } else {
      return ""
    }
  }

  render() {
    const book = this.props.item,
        bookInfo = this.props.item.bookInfo ? this.props.item.bookInfo : {},
        loans = book.loans,
        numberOfCopiesAvailable = this.numberOfBooksAvailableForLoan(loans),
        user = this.props.user,
        isBorrowedByMe = this.isBorrowedByMe(loans),
        action = this.getAction(isBorrowedByMe),
        actionAvailable =  this.isAnyCopyAvailable(loans) || isBorrowedByMe || this.props.purpose === 'add'; 

    bookInfo.imageLinks = bookInfo.imageLinks ? bookInfo.imageLinks : {};
    bookInfo.authors = bookInfo.authors ? bookInfo.authors : ['Unknown author'];
    book.id = this.props.identifier;
    const authorString = (bookInfo.authors !== []) ? bookInfo.authors.join(', ') : '';

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
            src={bookInfo.imageLinks.thumbnail}
          ></img>
        </div>
        <div className="six columns card-field">
          <div><b>{bookInfo.title}</b></div>
          <div>{authorString}</div>
          <div>{this.getDescription()}</div>
          {this.state.expandDescription ? this.getCurrentLoans() : ""}
          {!this.state.expandDescription ? <Button type="show-more" icon="fa fa-angle-down fa-2x" handleClick={this.expandDescriptionClick}></Button> 
            : <Button type="show-less" icon="fa fa-angle-up fa-2x" handleClick={this.expandDescriptionClick}></Button>}
        </div>
        { (loading) ? <Loader /> :
          <div className="three columns centralize card-field">
            {action !== 'add' ? <StatusIcon user={user} availableCopies={numberOfCopiesAvailable} isBorrowedByMe={isBorrowedByMe} /> : null}
            { !this.state.added ? <Button
              text={action}
              icon={icon}
              handleClick={this.clickHandler}
              requireConfirm={true}
              disabled={!actionAvailable}
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
  user: React.PropTypes.object
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
