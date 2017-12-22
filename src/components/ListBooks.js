import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

import BookShelf from './BookShelf';

const ListBooks = ({ booksCurrentReading, booksWantToRead, booksRead }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf title={'Currently Reading'} books={booksCurrentReading} />
          <BookShelf title={'Want to Read'} books={booksWantToRead} />
          <BookShelf title={'Read'} books={booksRead} />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

ListBooks.propTypes = {
  booksCurrentReading: PropTypes.array.isRequired,
  booksWantToRead: PropTypes.array.isRequired,
  booksRead: PropTypes.array.isRequired
};

export default ListBooks;
