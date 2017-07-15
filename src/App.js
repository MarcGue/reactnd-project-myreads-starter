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
      books: []
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      if (books) {
        this.setState({books})
      }
    })
  }

  /* global updateShelf b:true */
  /* eslint no-undef: "error" */
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then((data) => {
      // Suggestion of Udacity Reviewer
      book.shelf = shelf
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([ book ])
      }))
    })
  }

  render() {
    const { books } = this.state

    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <Search
            books={books}
            onUpdateShelf={this.updateShelf}
          />
        )}/>

        <Route exact path="/" render={() => (
          <BookList 
            books={books}
            onUpdateShelf={this.updateShelf}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
