import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

class BookList extends React.Component {
    render() {
        const { books, onUpdate } = this.props

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
                            onUpdate={onUpdate}
                        />
                        <BookShelf 
                            title='Want to read'
                            books={books.filter(book => 'wantToRead' === book.shelf)}
                            onUpdate={onUpdate}
                        />
                        <BookShelf 
                            title='Read'
                            books={books.filter(book => 'read' === book.shelf)}
                            onUpdate={onUpdate}
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

export default BookList