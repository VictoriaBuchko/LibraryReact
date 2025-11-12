import { createContext, useReducer } from 'react'

export const LibraryContext = createContext()

const initialState = {
    books: [],
    editingBook: null,
    searchQuery: {
        title: '',
        author: '',
        genre: '',
        pages: '',
    },
}

function libraryReducer(state, action) {
    switch (action.type) {
        case 'ADD_BOOK': {
            const newBook = {
                ...action.payload,
                id: Date.now(),
                isBorrowed: false,
            }
            return {
                ...state,
                books: [...state.books, newBook],
            }
        }

        case 'DELETE_BOOK':
            return {
                ...state,
                books: state.books.filter((book) => book.id !== action.payload),
            }

        case 'SET_EDITING_BOOK':
            return {
                ...state,
                editingBook: action.payload,
            }

        case 'UPDATE_BOOK':
            return {
                ...state,
                books: state.books.map((book) =>
                    book.id === action.payload.id ? { ...book, ...action.payload.data } : book
                ),
                editingBook: null,
            }

        case 'BORROW_BOOK':
            return {
                ...state,
                books: state.books.map((book) =>
                    book.id === action.payload ? { ...book, isBorrowed: true } : book
                ),
            }

        case 'RETURN_BOOK':
            return {
                ...state,
                books: state.books.map((book) =>
                    book.id === action.payload ? { ...book, isBorrowed: false } : book
                ),
            }

        case 'SET_SEARCH_QUERY':
            return {
                ...state,
                searchQuery: {
                    ...state.searchQuery,
                    ...action.payload,
                },
            }

        case 'CLEAR_SEARCH':
            return {
                ...state,
                searchQuery: {
                    title: '',
                    author: '',
                    genre: '',
                    pages: '',
                },
            }

        default:
            return state
    }
}

export function LibraryProvider({ children }) {
    const [state, dispatch] = useReducer(libraryReducer, initialState)

    //функція для фільтрації книг за пошуковими параметрами
    const getFilteredBooks = () => {
        const { title, author, genre, pages } = state.searchQuery
        const isSearchEmpty = !title && !author && !genre && !pages

        return state.books.filter((book) => {
            if (book.isBorrowed) return false
            if (isSearchEmpty) return true

            if (title && !book.title.toLowerCase().includes(title.toLowerCase())) {
                return false
            }

            if (author && !book.author.toLowerCase().includes(author.toLowerCase())) {
                return false
            }

            if (genre && !book.genre.toLowerCase().includes(genre.toLowerCase())) {
                return false
            }

            if (pages && book.pages !== parseInt(pages)) {
                return false
            }

            return true
        })
    }

    //функція для отримання виданих книг
    const getBorrowedBooks = () => {
        return state.books.filter((book) => book.isBorrowed)
    }

    return (
        <LibraryContext.Provider
            value={{
                state,
                dispatch,
                getFilteredBooks,
                getBorrowedBooks,
            }}
        >
            {children}
        </LibraryContext.Provider>
    )
}
