import React from 'react';
import Modal from 'react-modal';
import Button from './Button';
import StatusMessage from './StatusMessage';
import ModalStyle from '../styles/modal-style';
import { connect } from 'react-redux';
import actions from '../actions/books.js';
const { loan, returnBook, add } = actions;

class BookModal extends React.Component {
  constructor() {
    super();
    this.state = {
      confirm: false
    };
    this.handleConfirmClick = this.handleConfirmClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleConfirmClick() {
    if (this.props.action === 'add') {
      this.state.confirm = true;
      this.props.dispatch(add(this.props.book, this.props.token))
    }
    else if (this.props.action === 'borrow') {
      this.state.confirm = true;
      this.props.dispatch(loan(this.props.book, this.props.token));
    }
    else if (this.props.action === 'return') {
      this.state.confirm = true;
      this.props.dispatch(returnBook(this.props.book, this.props.loanID, this.props.token));
    }
  }

  closeModal() {
    this.props.onRequestClose();
  }

  render() {
    const actionString = `${this.props.action} `;
    let bottomSection = '';

    if (this.state.confirm) {
      let message = {
        message: this.props.message || '',
        status: this.props.status === 'failed' ? 'error' : 'success',
        icon: this.props.status !== 'failed' ? 'fa fa-check' : 'fa fa-exclamation'
      };
      bottomSection = (
        <div>
          <StatusMessage contents={message} />
          <Button
            text="close"
            handleClick={this.closeModal}
          />
        </div>
      );
    } else {
      bottomSection = (
        <div className="row">
          <div className="six columns">
            <Button
              icon="fa fa-remove"
              text="cancel"
              handleClick={this.closeModal}
            />
          </div>
          <div className="six columns">
            <Button
              icon="fa fa-check"
              type="button-primary-netlight"
              text={this.props.action}
              handleClick={this.handleConfirmClick}
            />
          </div>
        </div>
      );
    }

    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.closeModal}
        style={ModalStyle}
      >
        <div className="centralize">
          <h4>Do you want to {actionString}
            <span className="highlight">
              {this.props.book.title}
            </span>?
          </h4>
          {bottomSection}
        </div>
      </Modal>
    );
  }
}

BookModal.propTypes = {
  book: React.PropTypes.object,
  loanID: React.PropTypes.string,
  action: React.PropTypes.string,
  isOpen: React.PropTypes.bool,
  onRequestClose: React.PropTypes.func
};

export default connect(
    (state) => {
      return {
        status: state.books.status,
        message: state.books.message || '',
        token: state.auth.token
      }
    },
    (dispatch) => {
      return {
        dispatch
      }
    }
)(BookModal)
