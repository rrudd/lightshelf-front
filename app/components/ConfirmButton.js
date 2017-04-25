
import React from 'react';

export default class ConfirmButton extends React.Component {
    handleYes = (event) => {
        if (this.props.text === 'add') {
            if (!isNaN(parseInt(this.numberOfCopies.value))) {
                event.numberOfCopies = this.numberOfCopies.value;
            } 
        }
        this.props.handleYes(event);
    };

    render() {
        return (
            <div>
                <span style={this.props.styles.text}>Confirm {this.props.text}?</span>
                {this.props.text === 'add' ? 
                    <span style={styles.span}><input ref={(input) => {this.numberOfCopies = input}} defaultValue="1" style={styles.input} /> book(s) </span> : null}
                <button
                    style={this.props.styles.no}
                    onClick={this.props.handleNo}
                    className='no-btn'
                >
                    <i className='fa fa-close'></i> no
            </button>

                <button
                    style={this.props.styles.yes}
                    onClick={this.handleYes}
                    className='yes-btn'
                >
                    <i className='fa fa-check'></i> yes
            </button>
            </div>
        );
    }
}

let styles = {
    input: {
        width: '3rem',
    },
    span: {
        display: 'block'
    }

};

ConfirmButton.propTypes = {
    handleYes: React.PropTypes.func,
    handleNo: React.PropTypes.func,
    text: React.PropTypes.string,
    styles: React.PropTypes.object
}
