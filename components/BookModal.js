import React from 'react';
import Modal from 'react-modal';
import Button from './button';
import StatusMessage from './StatusMessage';
import BorrowField from './borrowField';
import ModalStyle from '../styles/modal-style';
import { connect } from 'react-redux';
import actions from '../actions/books.js';
const { loan } = actions;

class BookModal extends React.Component {
  constructor() {
    super();
    this.state = { statusMsg: null };
    this.handleConfirmClick = this.handleConfirmClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleConfirmClick() {
    const statusMsg = {};
    if (this.props.action === 'add') {
      const book = JSON.stringify(this.props.book);
      const url = 'http://localhost:3333/api/books/';
      const request = new Request(url, {
        method: 'POST',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }),
        body: book
      });

      fetch(request).then((response) => {
        statusMsg.status = response.ok ? 'success' : 'error';
        statusMsg.icon = response.ok ? 'fa fa-check' : 'fa fa-exclamation';
        return response.json();
      }).then((jso) => {
        statusMsg.message = jso.message;
        this.setState({ statusMsg });
      });
    }
    else if (this.props.action === 'borrow') {
      this.props.dispatch(loan(this.props.book, this.props.token))
    }
  }

  closeModal() {
    this.setState({ statusMsg: null });
    this.props.onRequestClose();
  }

  render() {
    const actionString = `${this.props.action} `;
    const field = (this.props.action === 'borrow') ? <BorrowField /> : null;
    let bottomSection = '';

    if (this.state.statusMsg) {
      bottomSection = (
        <div>
          <StatusMessage contents={this.state.statusMsg} />
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
          {field}
          {bottomSection}
        </div>
      </Modal>
    );
  }
}

BookModal.propTypes = {
  book: React.PropTypes.object,
  action: React.PropTypes.string,
  isOpen: React.PropTypes.bool,
  onRequestClose: React.PropTypes.func
};

export default connect(
    (state)=> {
      return {
        books: state.books,
        token: state.auth.token
      }
    },
    (dispatch)=> {
      return {
        dispatch
      }
    }
)(BookModal)
