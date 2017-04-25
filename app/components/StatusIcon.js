import React from 'react';

export default class statusIcon extends React.Component {
  render() {
    let icon = '',
        text = '',
        style = {};

  const user = this.props.user,
    availableCopies = this.props.availableCopies;

    //Count null objects to see if any available
    if (this.props.isBorrowedByMe) {
      icon = 'fa fa-remove';
      style = { color: 'red' };
      text =  `You have it`;
    } else if (availableCopies > 0) {
      text = 'Available';
      style = { color: 'green' };
    } else {
      //No copies available of this book
      icon = 'fa fa-remove';
      style = { color: 'red' };
      text =  `No available copies`;
    }

    return (
      <div>
        <div className="row" style={style}>
          {icon ? <i className={icon} /> : availableCopies}
        </div>
        <div className="row" style={style}>
          {text}
        </div>
      </div>
    );
  }
}

statusIcon.propTypes = {
  loans: React.PropTypes.object,
  user: React.PropTypes.object,
  availableCopies: React.PropTypes.number,
  isBorrowedByMe: React.PropTypes.bool,
};
