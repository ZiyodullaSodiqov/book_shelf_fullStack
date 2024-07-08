import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import '../../assets/book.css';
import Logo from '../../assets/logo.svg';
import Bell from '../../assets/bell.svg';

import axios from 'axios';

import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem } from '@mui/material';
import AddBookModal from './AddBookModal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Book() {
    const location = useLocation();
    const userId = location.state?.userId;

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [modalOpen, setModalOpen] = useState(false);
    
    const [username, setUsername] = useState('');
    const [editBook, setEditBook] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/books/all');
                setBooks(response.data.value);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/books/${id}`);
            setBooks(books.filter(book => book._id !== id));
        } catch (err) {
            setError(err);
        }
    };

    const handleEdit = (book) => {
        setEditBook(book);
        setEditDialogOpen(true);
    };

    const handleCloseEditDialog = () => {
        setEditDialogOpen(false);
        setEditBook(null);
    };

    const handleSaveEdit = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/api/books/${editBook._id}`, editBook);
            setBooks(books.map(book => book._id === editBook._id ? response.data : book));
            handleCloseEditDialog();
        } catch (err) {
            setError(err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditBook({ ...editBook, [name]: value });
    };

    const handleConditionChange = (e) => {
        setEditBook({ ...editBook, condition: e.target.value });
    };

    return (
        <div className="section__books">
            <div className="container">
                <div className='row'>
                    <div className="col">
                        <img src={Logo} alt="Logo" />
                        <input
                            type="text"
                            className='inp__search'
                            placeholder='Search for any training you want '
                        />
                    </div>
                    <div className="col">
                        <img className='bell__img' src={Bell} alt="Bell" />
                        <span>{username}</span>
                    </div>
                </div>
            </div>

            <div className="main__books">
                <div className="container__boks">
                    <div className="col_1">
                        <h1>
                            You've got <span style={{ color: "#6200EE" }}>{books.length} books</span>
                        </h1>
                        <p>Your books today</p>
                    </div>
                    <div className="col_1">
                        <Button variant="contained" color="primary" onClick={handleOpenModal}>
                            Add Book
                        </Button>
                        <AddBookModal
                            open={modalOpen}
                            handleClose={handleCloseModal}
                        />
                    </div>
                </div>
            </div>

            <div className="main__books">
                <div className="container__boks change__mobile">
                    {books.length > 0 ? (
                        books.map((book) => (
                            <div className="col_2" key={book._id}>
                                <p className='book___name__text'>
                                    {book.book_name}
                                </p>
                                <p className='book___url__text'>
                                    Cover: {book.book_url}
                                </p>
                                <p>
                                    Pages: {book.pages}
                                </p>
                                <p>
                                    Published:  {book.published}
                                </p>
                                <p>
                                    Isbn: {book.isbn}
                                </p>
                                <div className='condition__boks'>
                                    {book.condition}
                                </div>
                                <div className="change__transform">
                                    <IconButton onClick={() => handleEdit(book)} color="primary">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(book._id)} color="secondary">
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No books available</p>
                    )}
                </div>
            </div>

            <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
                <DialogTitle>Edit Book</DialogTitle>
                <DialogContent>
                    <Select
                        labelId="condition-label"
                        id="condition-select"
                        fullWidth
                        value={editBook?.condition || ''}
                        onChange={handleConditionChange}
                        label="Condition"
                        name="condition"
                    >
                        <MenuItem value={'NEW'}>NEW</MenuItem>
                        <MenuItem value={'Reading'}>Reading</MenuItem>
                        <MenuItem value={'Finished'}>Finished</MenuItem>
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveEdit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Book;
