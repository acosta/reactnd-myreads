import React from 'react';
import PropTypes from 'prop-types';

const Book = ({ book, onShelfChange }) => {
  const changeShelf = event => {
    const shelf = event.target.value;
    onShelfChange(shelf, book);
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 192,
            backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})`
          }}
        />
        <div className="book-shelf-changer">
          <select value={book.shelf || 'none'} onChange={changeShelf}>
            <option value="none" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors ? book.authors.join(', ') : 'Unknown'}</div>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onShelfChange: PropTypes.func.isRequired
};

export default Book;
