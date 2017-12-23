import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './components/ListBooks'
import SearchBooks from './components/SearchBooks'

import './App.css'

class BooksApp extends React.Component {
  state = {
    booksCurrentReading: [],
    booksWantToRead: [],
    booksRead: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      const booksCurrentReading = books.filter((book) => book.shelf === 'currentlyReading')
      const booksWantToRead = books.filter((book) => book.shelf === 'wantToRead')
      const booksRead = books.filter((book) => book.shelf === 'read')
      this.setState({
        booksCurrentReading,
        booksWantToRead,
        booksRead
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            booksCurrentReading={this.state.booksCurrentReading}
            booksWantToRead={this.state.booksWantToRead}
            booksRead={this.state.booksRead}
          />
        )}/>
        <Route path="/search" component={SearchBooks} />
      </div>
    )
  }
}

export default BooksApp
