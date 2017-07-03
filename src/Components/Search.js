import React from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import Book from './Book'

class Search extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            query: ''
        }
    }

    /*global updateQuery b:true*/
    /*eslint no-undef: "error"*/
    updateQuery = (query) => {
        this.setState({query: query})
    }

    render() {
        const { books, onUpdate } = this.props
        const { query } = this.state

        let filteredBooks
        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i')
            filteredBooks = books.filter((book) => match.test(book.title) || match.test(book.authors))
        } else {
            filteredBooks = books
        }

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close search</Link>
                    <div className="search-books-input-wrapper">
                        <input 
                            type="text" 
                            name="searchValue" 
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {filteredBooks.map((book) => (
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

export default Search