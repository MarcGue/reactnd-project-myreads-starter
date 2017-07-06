import React from 'react'

class Book extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            shelf: props.shelf
        }
    }

    /*global update b:true*/
    /*eslint no-undef: "error"*/
    update = (e) => {
        const book = this.props.book
        const shelf = e.target.value
        this.props.onUpdate(book, shelf)
    }

    render() {
        const { book } = this.props
        const { shelf } = this.state
        
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("' + book.imageLinks.thumbnail + '")' }}></div>
                    <div className="book-shelf-changer">
                        <select value={shelf} onChange={this.update}>
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

export default Book