import { useContext } from 'react'
import { LibraryContext } from '../LibraryContext'

function BorrowedBooks() {
    const { dispatch, getBorrowedBooks } = useContext(LibraryContext)

    const borrowedBooks = getBorrowedBooks()

    const handleReturn = (id) => {
        dispatch({ type: 'RETURN_BOOK', payload: id })
    }

    return (
        <div className="borrowed-books">
            <h2>Видані книги ({borrowedBooks.length})</h2>
            {borrowedBooks.length === 0 ? (
                <p className="empty-message">Всі книги в наявності</p>
            ) : (
                <div className="books-grid">
                    {borrowedBooks.map((book) => (
                        <div key={book.id} className="book-card">
                            <h4>{book.title}</h4>
                            <p>Автор: {book.author}</p>
                            <p>Жанр: {book.genre}</p>
                            <p>Рік: {book.year} | Сторінок: {book.pages}</p>
                            <div className="book-actions">
                                <button onClick={() => handleReturn(book.id)}>Повернути</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default BorrowedBooks