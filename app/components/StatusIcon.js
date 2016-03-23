import React from 'react';

export default class statusIcon extends React.Component {
  render() {
    let icon = '',
        text = '',
        style = {};

    const loan = this.props.loan,
        user = this.props.user;

    if (loan) {
      icon = 'fa fa-remove';
      style = { color: 'red' };
      text = loan.user._id === user.id ? `You have it`: `Not available, ${user.fullname} has it.`;
    } else {
      icon = 'fa fa-check';
      text = 'Available';
      style = { color: 'green' };
    }

    return (
      <div>
        <div className="row" style={style}>
          <i className={icon} />
        </div>
        <div className="row" style={style}>
          {text}
        </div>
      </div>
    );
  }
}

statusIcon.propTypes = {
  loan: React.PropTypes.object,
  user: React.PropTypes.object,
};
