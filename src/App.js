import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Search from './Components/Search'
import Book from './Components/Book'
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
    
    BooksAPI.getAll().then((books) => {
      this.setState( {books} )
    })
  }

  search(searchValue, maxResults) {
    BooksAPI.search(searchValue, maxResults).then((availableBooks) => {
      this.setState( {availableBooks} )
    })
  }

  /*global filterBooks b:true*/
  /*eslint no-undef: "error"*/
  filterBooks(shelf) {
    return this.state.books.map((book) => {
      let retVal = ''
      if (book.shelf === shelf) {
        return (
          <li key={book.id}>
            <Book book={book} />
          </li>
          )
        }
        return retVal
    })
  }

  render() {
    const {availableBooks} = this.state

    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <Search 
            books={availableBooks}
            onSearch={(searchValue, maxResults) => {
              this.search(searchValue, maxResults)
            }}
          />
        )}/>

        <Route exact path="/" render={() => (
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
                      {this.filterBooks('currentlyReading')}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.filterBooks('wantToRead')}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.filterBooks('read')}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
