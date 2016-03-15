import React from 'react';

export default class StatusMessage extends React.Component {
  render() {
    return (
      <div className={this.props.contents}>
        // <i className={this.props.contents.icon}></i>
        {this.props.contents}
      </div>
    );
  }
}

StatusMessage.propTypes = {
  contents: React.PropTypes.object,
};
