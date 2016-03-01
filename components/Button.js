import React from 'react';

export default class Button extends React.Component {
  render() {
    return (
      <button
        onClick={this.props.handleClick}
        className={this.props.type}
        disabled={this.props.disabled}
      >
        <i className={this.props.icon}></i> {this.props.text}
      </button>
    );
  }
}

Button.propTypes = {
  handleClick: React.PropTypes.func,
  type: React.PropTypes.string,
  icon: React.PropTypes.string,
  text: React.PropTypes.string,
  disabled: React.PropTypes.bool,
};
