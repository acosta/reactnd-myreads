import React from 'react'
import PropTypes from 'prop-types'

import Book from './Book'

const ListBooks = ({ booksCurrentReading, booksWantToRead, booksRead }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                { booksCurrentReading.map(book => (
                  <li key={book.id}>
                    <Book book={book} />
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                { booksWantToRead.map(book => (
                  <li key={book.id}>
                    <Book book={book} />
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                { booksRead.map(book => (
                  <li key={book.id}>
                    <Book book={book} />
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

ListBooks.propTypes = {
  booksCurrentReading: PropTypes.array.isRequired,
  booksWantToRead: PropTypes.array.isRequired,
  booksRead: PropTypes.array.isRequired
}

export default ListBooks;
