import React from 'react'
import Book from './Book'

class BookShelf extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {

        }
    }

    render() {
        const { title, books, onUpdate } = this.props

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                    { books.map((book) => (
                        <li key={book.id}>
                            <Book 
                                book={book}
                                shelf={book.shelf} 
                                onUpdate={onUpdate}
                            />
                        </li>
                    ))}
                </ol>
                </div>
            </div>
        )
    }
}

export default BookShelf