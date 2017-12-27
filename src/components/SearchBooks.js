import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Loader from 'react-loader'
import PropTypes from 'prop-types'
import * as BooksAPI from '../BooksAPI'

import Book from './Book';

class SearchBooks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      searchResults: [],
      isLoaded: true
    }
  }

  updateQuery = (query) => {
    if (query === '') {
      this.setState({
        query: '',
        searchResults: []
      })
    } else {
      this.setState({
        query: query.trim(),
        isLoaded: false
      })
      BooksAPI.search(query).then((books) => {
        if (books.error) {
          books = []
        } else {
          books.map(book => (this.props.booksOnShelves.filter((b) => b.id === book.id).map(b => book.shelf = b.shelf)))
        }
        this.setState({ searchResults: books, isLoaded: true})
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
        <Loader loaded={this.state.isLoaded} />
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
  onShelfChange: PropTypes.func.isRequired,
  booksOnShelves: PropTypes.array.isRequired
}

export default SearchBooks;
