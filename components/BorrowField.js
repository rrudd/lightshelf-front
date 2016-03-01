import React from 'react';

export default class BorrowField extends React.Component {
  render() {
    return (
      <div className="row">
        <input
          type="text"
          ref="user_id"
          placeholder="Enter name"
          className="u-full-width"
        />
      </div>
    );
  }
}

BorrowField.propTypes = {
  book_id: React.PropTypes.String,
  user_id: React.PropTypes.String,
};
