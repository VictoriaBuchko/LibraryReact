import { LibraryProvider } from './LibraryContext'
import BookForm from './components/BookForm'
import SearchBar from './components/SearchBar'
import BookList from './components/BookList'
import BorrowedBooks from './components/BorrowedBooks'
import './App.css'

function App() {
    return (
        <LibraryProvider>
            <div className="app">
                <header>
                    <h1>Бібліотека</h1>
                </header>
                <div className="main-layout">
                    <aside className="sidebar">
                        <BookForm />
                    </aside>
                    <main className="content">
                        <SearchBar />
                        <div className="lists">
                            <BookList />
                            <BorrowedBooks />
                        </div>
                    </main>
                </div>
            </div>
        </LibraryProvider>
    )
}

export default App