import React from 'react'
import { PropTypes } from 'prop-types';

class Book extends React.Component {
    /* global updateShelf b:true */
    /* eslint no-undef: "error" */
    updateShelf = (e) => {
        const book = this.props.book
        const shelf = e.target.value
        this.props.onUpdateShelf(book, shelf)
    }

    render() {
        const {book, shelf} = this.props
        
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("' + book.imageLinks.thumbnail + '")' }}></div>
                    <div className="book-shelf-changer">
                        <select value={shelf} onChange={this.updateShelf}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
            </div>
        )
    }
}

Book.propTypes = {
    onUpdateShelf: PropTypes.func.isRequired
}

export default Book