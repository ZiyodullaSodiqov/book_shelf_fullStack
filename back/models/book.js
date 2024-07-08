const mongoose = require('mongoose');
const bookSchema = mongoose.Schema({

    book_name: {
        type: String,
        required: true
    },

    book_url: {
        type: String,
        required: true
    },

    pages: {
        type: Number,
        required: true
    },

    published: {
        type: Number,
        required: true
    },

    isbn: {
        type: Number,
        required: true
    },

    condition: {
        type: String,
        required: true
    },

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Register' },

    date: {
        type: Date,
        default: Date.now()
    }

})

module.exports = mongoose.model('book', bookSchema);