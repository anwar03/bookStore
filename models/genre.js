const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var genreSchema = new Schema({
    name:{
        type: String,
        required: [true, 'this is required field']
    },
    create_date:{
        type: Date,
        default: Date.now
    }
});

var Genre = mongoose.model('genre', genreSchema);

module.exports = Genre;
