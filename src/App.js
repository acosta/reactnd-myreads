import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './components/ListBooks'
import SearchBooks from './components/SearchBooks'

import './App.css'

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      const currentlyReading = books.filter((book) => book.shelf === 'currentlyReading')
      const wantToRead = books.filter((book) => book.shelf === 'wantToRead')
      const read = books.filter((book) => book.shelf === 'read')
      this.setState({
        currentlyReading,
        wantToRead,
        read
      })
    })
  }

  removeBookFromShelf = (shelf, book) => {
    let books = []
    switch(shelf) {
      case 'currentlyReading':
        books = this.state.currentlyReading.filter((b) => b.id !== book.id)
        this.setState({ currentlyReading: books })
        break
      case 'wantToRead':
        books = this.state.wantToRead.filter((b) => b.id !== book.id)
        this.setState({ wantToRead: books })
        break
      case 'read':
        books = this.state.read.filter((b) => b.id !== book.id)
        this.setState({ read: books })
        break
      default:
        break
    }
  }

  updateBookShelf = (newShelf, book) => {
    book.shelf = newShelf
    switch(newShelf) {
      case 'currentlyReading': {
        let { currentlyReading } = this.state
        currentlyReading.push(book)
        this.setState({ currentlyReading })
        break
      }
      case 'wantToRead': {
        let { wantToRead } = this.state
        wantToRead.push(book)
        this.setState({ wantToRead })
        break
      }
      case 'read': {
        let { read } = this.state
        read.push(book)
        this.setState({ read })
        break
      }
      default:
        break
    }
  }

  moveBookToShelf = (newShelf, book) => {
    const actualShelf = book.shelf
    // remove book from actual shelf
    this.removeBookFromShelf(actualShelf, book)
    // add book to new shelf
    this.updateBookShelf(newShelf, book)
    // update book in backend
    BooksAPI.update(book, newShelf)
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            booksCurrentReading={this.state.currentlyReading}
            booksWantToRead={this.state.wantToRead}
            booksRead={this.state.read}
            onShelfChange={this.moveBookToShelf}
          />
        )}/>
        <Route path="/search" component={SearchBooks} />
      </div>
    )
  }
}

export default BooksApp
