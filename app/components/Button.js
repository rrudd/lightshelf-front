import React from 'react';

export default class Button extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.handleYes = this.handleYes.bind(this);
    this.handleNo = this.handleNo.bind(this);

    if(!!props.requireConfirm) {
      this.clickHandler = ()=> {
        let k = 0;
        this.setState({confirm: true});
      }
    }
    else {
      this.clickHandler = props.handleClick;
    }
  }

  handleYes(e) {
    this.setState({confirm: false});
    this.props.handleClick(arguments);
  };

  handleNo(e) {
    this.setState({confirm: false});
  };

  render() {
    let confirm = this.state.confirm || false;
    if(confirm) {
      return (
          <div>
            <span style={styles.text}>Confirm add?</span>
            <button
                style={styles.no}
                onClick={this.handleNo}
                className='no-btn'
            >
              <i className='fa fa-close'></i> no
            </button>

            <button
                style={styles.yes}
              onClick={this.handleYes}
              className='yes-btn'
            >
              <i className='fa fa-check'></i> yes
            </button>
          </div>
      );
    }
    else {
      return (
          <button
              onClick={this.clickHandler}
              className={this.props.type}
              disabled={this.props.disabled}
          >
            <i className={this.props.icon}></i> {this.props.text}
          </button>
      );
    }
  }
}

let styles = {
  yes: {
    marginLeft: '1rem',
    backgroundColor: 'white',
    color: 'green',
    borderColor: 'green'
  },
  no: {
    backgroundColor: 'white',
    color: 'red',
    borderColor: 'red'
  },
  text: {
    display: 'block',
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: '1rem',
    marginTop: '1rem'
  }
};

Button.propTypes = {
  handleClick: React.PropTypes.func,
  type: React.PropTypes.string,
  icon: React.PropTypes.string,
  text: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  requireConfirm: React.PropTypes.bool
};
