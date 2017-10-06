import React, { Component } from 'react';
import ItemBooks from './ItemBooks'

class ShelfBooks extends Component {

    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books.map((book) => (
                                <ItemBooks key={book.id} book={book} onShelfChange={(shelf)=>{ this.props.onShelfChange(book.id, shelf) }} />
                        ))}
                    </ol>
                </div>
            </div>
        )
    }

}

export default ShelfBooks