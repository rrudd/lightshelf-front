import React from 'react';

export default class statusIcon extends React.Component {
  render() {
    let icon = '';
    let text = '';
    let style = {};
    if (this.props.active) {
      icon = 'fa fa-remove';
      text = `Not available.`;
      style = { color: 'red' };
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
  active: React.PropTypes.bool
};
