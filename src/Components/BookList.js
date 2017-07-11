import React from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types';
import BookShelf from './BookShelf'

class BookList extends React.Component {
    render() {
        const { books, onUpdateShelf } = this.props

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf 
                            title='Currently reading'
                            books={books.filter(book => 'currentlyReading' === book.shelf)}
                            onUpdateShelf={onUpdateShelf}
                        />
                        <BookShelf 
                            title='Want to read'
                            books={books.filter(book => 'wantToRead' === book.shelf)}
                            onUpdateShelf={onUpdateShelf}
                        />
                        <BookShelf 
                            title='Read'
                            books={books.filter(book => 'read' === book.shelf)}
                            onUpdateShelf={onUpdateShelf}
                        />
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
          </div>
        )
    }
}

BookList.propTypes = {
    onUpdateShelf: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
}

export default BookList