import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ItemBooks from "./ItemBooks";

class SearchBooks extends Component {
    state = {
        query: '',
        filterBooks: []
    }

    checkShelf = (filterBooks, books) => {
        return filterBooks.map((fBook)=>{
            books.forEach((book)=>{
                if(book.id === fBook.id){
                    fBook.shelf = book.shelf
                }
            })
            return fBook
        })
    }

    updateQuery = (query) => {
        this.setState({query: query.trim() })
        if (query.length !== 0) {
            BooksAPI.search(query, 10).then((books) => {
                if(books.length>0){
                    //books = books.filter((book)=>book.imageLinks)
                    books = this.checkShelf(books, this.props.books)

                    this.setState({filterBooks: books})
                }
                else{
                    this.setState({filterBooks: []})
                }
            })
        } else {
            this.setState({filterBooks: [], query: ''})
        }
    }

    render() {

        const { filterBooks } = this.state
        const { query } = this.state

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className='close-search' to='/'>Close</Link>
                    <div className="search-books-input-wrapper">

                        <input type="text" placeholder="Search by title or author" value={query}
                               onChange={(event) => this.updateQuery(event.target.value)}/>

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {filterBooks.map((book) => (
                            <ItemBooks key={book.id} book={book} onShelfChange={(shelf)=>{ this.props.onShelfChange(book.id,shelf) }} />
                        ))}
                    </ol>
                </div>
            </div>
        )
    }

}

export default SearchBooks