import React from 'react'
 import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ShelfBooks from "./ShelfBooks";
import './App.css'


class BooksApp extends React.Component {

    state = {
        books: []
    }

    componentDidMount() {
        this.loadBooks()
    }

    changeShelf = (id,shelf = 'read') => {
        BooksAPI.update({id},shelf).then(() => {
            this.loadBooks()
        })
    }

    loadBooks = () => {
        BooksAPI.getAll().then((books) => { this.setState({ books }) })
    }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={({ history }) => (
          <SearchBooks books={this.state.books} onShelfChange={(id,shelf) => { this.changeShelf(id,shelf); history.push('/') }} />
        )}/>
        <Route exact path='/' render={() => (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <ShelfBooks books={this.state.books.filter((book) => (book.shelf === 'currentlyReading'))} shelfTitle={"Currently Reading"} onShelfChange={(id,shelf) => { this.changeShelf(id,shelf) }} />
                        <ShelfBooks books={this.state.books.filter((book) => (book.shelf === 'wantToRead'))} shelfTitle={"Want to Read"} onShelfChange={(id,shelf) => { this.changeShelf(id,shelf) }} />
                        <ShelfBooks books={this.state.books.filter((book) => (book.shelf === 'read'))} shelfTitle={"Read"} onShelfChange={(id,shelf) => { this.changeShelf(id,shelf) }} />
                    </div>
                </div>

                <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                </div>
            </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
