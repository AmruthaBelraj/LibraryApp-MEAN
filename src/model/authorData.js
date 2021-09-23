const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/BookDb');
const Schema = mongoose.Schema;

var NewAuthorSchema = new Schema({
    authorName : String,
    bookName : String,
    bookGenre : String,
    imageUrl : String
});

var Authordata = mongoose.model('author', NewAuthorSchema);

module.exports = Authordata;