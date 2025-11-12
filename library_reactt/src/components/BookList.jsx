import { useContext } from 'react'
import { LibraryContext } from '../LibraryContext'

function BookList() {
    const { dispatch, getFilteredBooks } = useContext(LibraryContext)

    const books = getFilteredBooks()

    const handleDelete = (id) => {
        if (window.confirm('Видалити цю книгу?')) {
            dispatch({ type: 'DELETE_BOOK', payload: id })
        }
    }

    const handleEdit = (book) => {
        dispatch({ type: 'SET_EDITING_BOOK', payload: book })
    }

    const handleBorrow = (id) => {
        dispatch({ type: 'BORROW_BOOK', payload: id })
    }

    return (
        <div className="book-list">
            <h2>Доступні книги ({books.length})</h2>
            {books.length === 0 ? (
                <p className="empty-message">Немає книг</p>
            ) : (
                <div className="books-grid">
                    {books.map((book) => (
                        <div key={book.id} className="book-card">
                            <h4>{book.title}</h4>
                            <p>Автор: {book.author}</p>
                            <p>Жанр: {book.genre}</p>
                            <p>Рік: {book.year} | Сторінок: {book.pages}</p>
                            <div className="book-actions">
                                <button onClick={() => handleEdit(book)}>Редагувати</button>
                                <button onClick={() => handleBorrow(book.id)}>Видати</button>
                                <button onClick={() => handleDelete(book.id)}>Видалити</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default BookList