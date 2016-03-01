import React from 'react';
import SearchField from '../components/SearchField';
import BookCard from '../components/BookCard';
import Loader from '../components/Loader';

export default class Search extends React.Component {
  constructor() {
    super();
    this.state = { items: [], loading: false };
    this.searchSubmit = this.searchSubmit.bind(this);
  }

  searchSubmit(search) {
    this.setState({ loading: true });
    const baseUrl = 'https://www.googleapis.com/books/v1/volumes?q=';
    const searchType = '&printType=books';
    $.get(baseUrl + encodeURIComponent(search) + searchType, data =>
      this.setState({ items: data.items, loading: false }));
  }

  render() {
    let results = [];
    if (this.state.items) {
      results = this.state.items.map(item =>
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
          {this.state.loading ? <Loader /> : results}
        </div>
      </div>
    );
  }
}
