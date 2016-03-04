import React from 'react';
import {connect} from 'react-redux';
import SearchField from '../components/SearchField';
import BookCard from '../components/BookCard';
import Loader from '../components/Loader';
import actions from '../actions/search';

class Search extends React.Component {
  constructor() {
    super();
    this.searchSubmit = this.searchSubmit.bind(this);
  }

  searchSubmit(search) {
    this.props.dispatch(actions.searchGoogle(search));
  }

  render() {
    let results = [],
        loading =  this.props.status === 'loading';

    if (this.props.items) {
      results = this.props.items.map(item =>
        <BookCard
          key={item.id}
          item={item.volumeInfo}
          identifier={item.id}
          purpose="add"
        />
      );
    } else {
      results = (
        <div className="row centralize">
          <h5>No results found!</h5>
        </div>
      );
    }

    return (
      <div className="first-component">
        <SearchField searchSubmit={this.searchSubmit}/>
        <div id="resultlist" className="resultlist">
          {loading ? <Loader /> : results}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state)=> {
      return {
        status: state.search.status,
        items: state.search.items
      }
    },
    mapDispatchToProps = (dispatch)=> {
      return {
        dispatch
      }
    };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search)

