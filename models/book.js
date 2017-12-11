const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    name:{
        type: String,
        required: [true, 'this is required field']
    },
    genre:{
        type: String,
        required: [true, 'genre name is required field']
    },
    description:{
        type: String,
    },
    author:{
        type: String,
        required: [true, 'Author name is required']
    },
    publisher:{
        type: String
    },
    pages:{
        type: String
    },
    image_url:{
        type: String
    },
    buy_url:{
        type: String
    },
    create_date:{
        type: Date,
        default: Date.now
    }
});

var Book = mongoose.model('book', bookSchema);

module.exports = Book;
