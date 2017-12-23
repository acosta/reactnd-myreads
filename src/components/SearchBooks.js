import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from '../BooksAPI'

import Book from './Book';

class SearchBooks extends Component {
  state = {
    query: '',
    searchResults: []
  }

  updateQuery = (query) => {
    if (query === '') {
      this.setState({
        query: '',
        searchResults: []
      })
    } else {
      this.setState({ query: query.trim() })
      BooksAPI.search(query).then((books) => {
        this.setState({ searchResults: books})
      })
    }
  }

  render () {
    const { query, searchResults } = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              name="query"
              value={query}
              onChange={(e) => { this.updateQuery(e.target.value)}}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
        {query && (searchResults.length === 0
            ? (<p>No results found for <em>"{query}"</em></p>)
            : (<p>Showing {searchResults.length} books for <em>"{query}"</em></p>))}
          <ol className="books-grid">
            {searchResults.map(book => (
              <li key={book.id}>
                <Book book={book} onShelfChange={this.props.onShelfChange} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
};

SearchBooks.propTypes = {
  onShelfChange: PropTypes.func.isRequired
}

export default SearchBooks;
