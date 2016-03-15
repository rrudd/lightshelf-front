import React from 'react';
import ReactDOM from 'react-dom';
import Button from './button';

export default class SearchField extends React.Component {
  constructor() {
    super();
    this.state = { noQuery: true };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const input = ReactDOM.findDOMNode(this.refs.search);
    this.props.searchSubmit(input.value);
  }

  handleChange() {
    const noQuery = !ReactDOM.findDOMNode(this.refs.search).value;
    this.setState({ noQuery });
  }

  render() {
    return (
        <div className="centralize">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="nine columns">
                <input
                  type="text"
                  className="u-full-width"
                  placeholder="Title, author, etc..."
                  ref="search"
                  onChange={this.handleChange}
                />
              </div>
              <div className="three columns">
                <Button
                  disabled={this.state.noQuery}
                  type="button-primary-netlight"
                  text="Search"
                  icon="fa fa-search"
                />
              </div>
            </div>
          </form>
        </div>
    );
  }
}

SearchField.propTypes = {
  searchSubmit: React.PropTypes.func,
};
