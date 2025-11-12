import { useState, useContext } from 'react'
import { LibraryContext } from '../LibraryContext'

function SearchBar() {
    const { dispatch } = useContext(LibraryContext)

    //стани полів пошукку
    const [searchData, setSearchData] = useState({
        title: '',
        author: '',
        genre: '',
        pages: '',
    })

    //зміна полів
    const handleChange = (e) => {
        const { name, value } = e.target
        setSearchData({
            ...searchData,
            [name]: value,
        })
    }

    //пошук
    const handleSearch = () => {
        dispatch({
            type: 'SET_SEARCH_QUERY',
            payload: searchData,
        })
    }

    //очищення пошуку
    const handleClear = () => {
        setSearchData({
            title: '',
            author: '',
            genre: '',
            pages: '',
        })
        dispatch({ type: 'CLEAR_SEARCH' })
    }

    return (
        <div className="search-bar">
            <h3>Пошук книг</h3>
            <div className="search-fields">
                <input
                    type="text"
                    name="title"
                    value={searchData.title}
                    onChange={handleChange}
                    placeholder="Назва книги"
                />
                <input
                    type="text"
                    name="author"
                    value={searchData.author}
                    onChange={handleChange}
                    placeholder="Автор"
                />
                <input
                    type="text"
                    name="genre"
                    value={searchData.genre}
                    onChange={handleChange}
                    placeholder="Жанр"
                />
                <input
                    type="number"
                    name="pages"
                    value={searchData.pages}
                    onChange={handleChange}
                    placeholder="Кількість сторінок"
                />
            </div>
            <div className="search-buttons">
                <button onClick={handleSearch}>Шукати</button>
                <button onClick={handleClear}>Очистити</button>
            </div>
        </div>
    )
}

export default SearchBar