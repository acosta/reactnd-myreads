import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Loader from 'react-loader'
import * as BooksAPI from './BooksAPI'
import ListBooks from './components/ListBooks'
import SearchBooks from './components/SearchBooks'

import './App.css'

class BooksApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentlyReading: [],
      wantToRead: [],
      read: [],
      isLoaded: true
    }
  }

  componentDidMount() {
    this.setState({ isLoaded: false })
    BooksAPI.getAll().then((books) => {
      const currentlyReading = books.filter((book) => book.shelf === 'currentlyReading')
      const wantToRead = books.filter((book) => book.shelf === 'wantToRead')
      const read = books.filter((book) => book.shelf === 'read')
      this.setState({
        currentlyReading,
        wantToRead,
        read,
        isLoaded: true
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
      case 'currentlyReading':
        this.setState(previousState => {
          return { currentlyReading: previousState.currentlyReading.concat([book]) }
        })
        break
      case 'wantToRead': {
        this.setState(previousState => {
          return { wantToRead: previousState.wantToRead.concat([book]) }
        })
        break
      }
      case 'read': {
        this.setState(previousState => {
          return { read: previousState.read.concat([book]) }
        })
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
        <Loader loaded={this.state.isLoaded} />
        <Route exact path="/" render={() => (
          <ListBooks
            booksCurrentReading={this.state.currentlyReading}
            booksWantToRead={this.state.wantToRead}
            booksRead={this.state.read}
            onShelfChange={this.moveBookToShelf}
          />
        )}/>
        <Route path="/search" render={() => (
          <SearchBooks
            onShelfChange={this.moveBookToShelf}
            booksOnShelves={this.state.currentlyReading
                            .concat(this.state.wantToRead)
                            .concat(this.state.read)
                          }
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
