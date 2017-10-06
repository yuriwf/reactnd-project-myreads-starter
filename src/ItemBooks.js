import React, { Component } from 'react';
// import PropTypes from 'prop-types'

class ItemBooks extends Component {

    changeShelf = (e) => {
        this.props.onShelfChange(e.target.value)
    }

    render() {
        const image = this.props.book.imageLinks.thumbnail || this.props.book.imageLinks.smallThumbnail

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url("${image}")`
                        }}></div>

                        <div className="book-shelf-changer">
                            <select onChange={this.changeShelf} value={this.props.book.shelf}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none" selected="selected">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{ this.props.book.title }</div>
                    <div className="book-authors">{ this.props.book.authors.join(', ') }</div>
                </div>
            </li>
        )
    }
}

export default ItemBooks