import React from 'react';

export default class StatusMessage extends React.Component {
  render() {
    return (
      <div>
        <i className={this.props.contents.icon} style={{color:'green'}}></i>
        <span style={{color:'green'}}>{this.props.contents.message}</span>
      </div>
    );
  }
}

StatusMessage.propTypes = {
  contents: React.PropTypes.object
};
