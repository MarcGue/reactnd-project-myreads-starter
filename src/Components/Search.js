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
            searchResults: []
        }
    }

    queryChanged = (query) => {
        this.setState({query})
        if (query.length !== 0) {
            BooksAPI.search(query, 50)
            .then((searchResults) => {
                const mappedSearchResults = searchResults.map((searchResult) => {
                let matchedBook = this.props.books.find(book => book.id === searchResult.id)
                searchResult.shelf = matchedBook ? matchedBook.shelf : 'none'
                return searchResult
                })

                this.setState({searchResults: mappedSearchResults})
            })
            .catch((error) => {
                console.log(error);
                this.setState({searchResults: []})
            })
        }
    }

    render() {
        const { onUpdateShelf } = this.props
        const { query, searchResults } = this.state

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
                            onChange={(event) => this.queryChanged(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {searchResults.map((result) => (
                            <li key={result.id}>
                                <Book 
                                    book={result}
                                    shelf={result.shelf}
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