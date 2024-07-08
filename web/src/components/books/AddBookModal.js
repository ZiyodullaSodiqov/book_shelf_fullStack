import React, { useState } from 'react';
import axios from 'axios';

import { useLocation } from 'react-router-dom';

import { Modal, Box, TextField, Button } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const AddBookModal = ({ open, handleClose, handleBookAdded }) => {

    const [book_name, setBook_name] = useState('');
    const [book_url, setBook_url] = useState('');
    const [pages, setPages] = useState('');
    const [published, setPublished] = useState('');
    const [isbn, setIsbn] = useState('');
    const [condition, setCondition] = useState('');

    const location = useLocation();
    const userId = location.state?.userId

    const handleAddBook = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            toast.error("You need to be logged in to add a book");
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:5000/api/books/create`,
                { book_name, book_url, pages, published, isbn, condition },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 201) {
                toast.success("Book added successfully!");
                handleBookAdded();
                handleClose();
            } else {
                toast.error("Failed to add book");
            }
        } catch (error) {
            toast.error("Failed to add book");
        }
    };

    return (
        <>
            <ToastContainer />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <h2 id="modal-modal-title">
                        Add a Book
                    </h2>
                    <form onSubmit={handleAddBook}>
                        <TextField
                            id="outlined-basic"
                            label="Book name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={book_name}
                            onChange={(e) => setBook_name(e.target.value)}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Book URL"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={book_url}
                            onChange={(e) => setBook_url(e.target.value)}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Pages"
                            variant="outlined"
                            fullWidth
                            type='number'
                            margin="normal"
                            value={pages}
                            onChange={(e) => setPages(e.target.value)}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Published"
                            variant="outlined"
                            fullWidth
                            type='number'
                            margin="normal"
                            value={published}
                            onChange={(e) => setPublished(e.target.value)}
                        />
                        <TextField
                            id="outlined-basic"
                            label="ISBN"
                            variant="outlined"
                            fullWidth
                            type='number'
                            margin="normal"
                            value={isbn}
                            onChange={(e) => setIsbn(e.target.value)}
                        />
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            fullWidth
                            value={condition}
                            onChange={(e) => setCondition(e.target.value)}
                            label="Condition"
                        >
                            <MenuItem value={'NEW'}>NEW</MenuItem>
                            <MenuItem value={'Reading'}>Reading</MenuItem>
                            <MenuItem value={'Finished'}>Finished</MenuItem>
                        </Select>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            style={{
                                marginTop: "20px"
                            }}
                        >
                            Add Book
                        </Button>
                    </form>
                </Box>
            </Modal>
        </>
    );
};

export default AddBookModal;
