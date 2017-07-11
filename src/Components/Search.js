import React from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types';
import * as BooksAPI from '../BooksAPI'
import Book from './Book'

class Search extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            query: '',
            books: []
        }
    }

    updateQuery = (query) => {
        this.setState({query: query})
        if (query.length !== 0) {
            BooksAPI.search(query, 50)
            .then((books) => {
                this.setState({books: books})
            })
            .catch((error) => {
                console.log(error);
                this.setState({books: []})
            })
        }
    }

    render() {
        const { onUpdateShelf } = this.props
        const { query, books } = this.state

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

Search.propTypes = {
    onUpdateShelf: PropTypes.func.isRequired
}

export default Search