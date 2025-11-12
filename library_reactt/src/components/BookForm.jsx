import { useState, useContext, useEffect } from 'react'
import { LibraryContext } from '../LibraryContext'

function BookForm() {
    const { state, dispatch } = useContext(LibraryContext)

    //стан форми
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: '',
        year: '',
        pages: '',
    })

    //сайд ефект заповнення форми при редагуванні
    useEffect(() => {
        if (state.editingBook) {
            setFormData({
                title: state.editingBook.title,
                author: state.editingBook.author,
                genre: state.editingBook.genre,
                year: state.editingBook.year,
                pages: state.editingBook.pages,
            })
        }
    }, [state.editingBook])

    //зміна полів форми
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    //відправка форми 
    const handleSubmit = (e) => {
        e.preventDefault()

        //валідація
        if (!formData.title || !formData.author || !formData.genre || !formData.year || !formData.pages) {
            alert('Заповніть всі поля')
            return
        }

        if (state.editingBook) {
            //редагування існуючої книги
            dispatch({
                type: 'UPDATE_BOOK',
                payload: {
                    id: state.editingBook.id,
                    data: {
                        title: formData.title,
                        author: formData.author,
                        genre: formData.genre,
                        year: parseInt(formData.year),
                        pages: parseInt(formData.pages),
                    },
                },
            })
        } else {
            //додавання нової книги
            dispatch({
                type: 'ADD_BOOK',
                payload: {
                    title: formData.title,
                    author: formData.author,
                    genre: formData.genre,
                    year: parseInt(formData.year),
                    pages: parseInt(formData.pages),
                },
            })
        }

        //очищення форми
        setFormData({
            title: '',
            author: '',
            genre: '',
            year: '',
            pages: '',
        })
    }

    //скасування редагування
    const handleCancel = () => {
        dispatch({ type: 'SET_EDITING_BOOK', payload: null })
        setFormData({
            title: '',
            author: '',
            genre: '',
            year: '',
            pages: '',
        })
    }

    return (
        <div className="book-form">
            <h2>{state.editingBook ? 'Редагувати книгу' : 'Додати нову книгу'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Назва книги:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Введіть назву книги"
                    />
                </div>

                <div className="form-group">
                    <label>Автор:</label>
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        placeholder="Введіть автора"
                    />
                </div>

                <div className="form-group">
                    <label>Жанр:</label>
                    <input
                        type="text"
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        placeholder="Введіть жанр"
                    />
                </div>

                <div className="form-group">
                    <label>Рік випуску:</label>
                    <input
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        placeholder="Введіть рік"
                        min="1000"
                        max="2100"
                    />
                </div>

                <div className="form-group">
                    <label>Кількість сторінок:</label>
                    <input
                        type="number"
                        name="pages"
                        value={formData.pages}
                        onChange={handleChange}
                        placeholder="Введіть кількість сторінок"
                        min="1"
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-primary">
                        {state.editingBook ? 'Зберегти зміни' : 'Додати книгу'}
                    </button>
                    {state.editingBook && (
                        <button type="button" onClick={handleCancel} className="btn-secondary">
                            Скасувати
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default BookForm