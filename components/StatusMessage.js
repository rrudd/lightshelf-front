import React from 'react';

export default class StatusMessage extends React.Component {
  render() {
    return (
      <div className={this.props.contents.status}>
        <i className={this.props.contents.icon}></i>
        {this.props.contents.message}
      </div>
    );
  }
}

StatusMessage.propTypes = {
  contents: React.PropTypes.object,
};
