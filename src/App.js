import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Search from './Components/Search'
import BookList from './Components/BookList'
import './App.css'

class BooksApp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      availableBooks: [],
      books: []
    }
  }

  componentDidMount() {
    this.search("Web Development", 50)
    this.getAll()
  }

  getAll() {
    BooksAPI.getAll().then((books) => {
      this.setState( {books} )
    })
  }

  search(searchValue, maxResults) {
    BooksAPI.search(searchValue, maxResults).then((availableBooks) => {
      this.setState( {availableBooks} )
    })
  }

  /*global update b:true*/
  /*eslint no-undef: "error"*/
  update = (bookToUpdate, shelf)  => {
    const books = this.state.books

    BooksAPI.update(bookToUpdate, shelf)
    .then((data) => {
      return BooksAPI.get(bookToUpdate.id)
    })
    .then((updatedBook) => {
      const filteredBooks = books.filter(book => book.id === updatedBook.id)
      if (filteredBooks.length === 0) {
        books.push(updatedBook)
      }

      this.setState({
        books: books.map((book) => {
          return book.id === updatedBook.id
            ? Object.assign({}, book, {shelf: shelf})
            : book
          })
        })
    })
  }

  render() {
    const { books, availableBooks } = this.state

    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <Search 
            books={availableBooks}
            onUpdate={this.update}
          />
        )}/>

        <Route exact path="/" render={() => (
          <BookList 
            books={books}
            onUpdate={this.update}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
