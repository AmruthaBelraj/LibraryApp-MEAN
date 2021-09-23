const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/BookDb');
const Schema = mongoose.Schema;

var NewBookSchema = new Schema({
    bookName : String,
    bookAuthor : String,
    bookGenre : String,
    imageUrl : String
});

var Bookdata = mongoose.model('book', NewBookSchema);

module.exports = Bookdata;