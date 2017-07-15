import React from 'react'
import { PropTypes } from 'prop-types';
import Book from './Book'

class BookShelf extends React.Component {
    render() {
        const {title, books, onUpdateShelf} = this.props

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((book) => (
                        <li key={book.id}>
                            <Book 
                                book={book}
                                shelf={book.shelf} 
                                onUpdateShelf={onUpdateShelf}
                            />
                        </li>
                    ))}
                </ol>
                </div>
            </div>
        )
    }
}

BookShelf.propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
}

export default BookShelf