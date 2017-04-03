import React from 'react';

class LibrarySearch extends React.Component {

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.searchSubmit(this.searchInput.value);
    }

    render() {
        return(
            <form className="library-search" onSubmit={this.handleSubmit}>
            <input
                type="text"
                placeholder="Search book"
                ref={(input) => { this.searchInput = input; }}
            />
            </form>
        );
    }
}

LibrarySearch.propTypes = {
    searchSubmit : React.PropTypes.func
};

export default LibrarySearch;