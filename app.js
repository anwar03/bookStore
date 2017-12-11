const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const Genre = require('./models/genre');
const Book = require('./models/book');

const app = express();

// Created database connection
mongoose.connect('mongodb://localhost/bookStore');
var db = mongoose.connection;
mongoose.Promies = global.Promies;

app.use(express.static('client'));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.send('please use /api/books or /api/genres');
});

app.get('/api/genres', function(req, res, next){
    Genre.find({}, function(err, genres){
        if (err) throw err;
        res.json(genres);
    });
});

app.get('/api/genres/:id', function(req, res, next){
    Genre.findById({_id: req.params.id}, function(err, genre){
        if (err) throw err;
        res.json(genre);
    });
});

app.post('/api/genres', function(req, res, next){
    Genre.create(req.body).then(function(genre){
        res.send(genre);
    }).catch(next);
});

app.put('/api/genres/:id', function(req, res, next){
    Genre.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function(){
        Genre.findById({ _id: req.params.id }).then(function(genre){
            res.send(genre);
        });
    });
});

app.delete('/api/genres/:id', function(req, res, next){
    Book.findByIdAndRemove({ _id: req.params.id }).then( function(err, genre){
        if (err) throw err;
        res.json(genre);
    });
});

app.get('/api/books', function(req, res, next){
    Book.find({}, function(err, books){
        if (err) throw err;
        res.json(books);
    });
});

app.get('/api/books/:id', function(req, res, next){
    Book.findById({_id: req.params.id }, function(err, book){
        if (err) throw err;
        res.json(book);
    });
});

app.post('/api/books', function(req, res, next){
    Book.create(req.body).then(function(book){
        res.send(book);
    }).catch(next);
});

app.put('/api/books/:id', function(req, res, next){
    var data = req.body;
    var book = {
            name: data.name,
            genre: data.genre,
            author: data.author,
            description: data.description,
            pages: data.pages,
            publisher: data.publisher,
            image_url: data.image_url,
            buy_url: data.buy_url
        };
    Book.findByIdAndUpdate({ _id: req.params.id }, book).then(function(){
        Book.findOne({ _id: req.params.id }).then(function(book){
            res.send(book);
        });
    });
});

app.delete('/api/books/:id', function(req, res, next){
    Book.findByIdAndRemove({ _id: req.params.id }, function(err, books){
        if (err) throw err;
        res.json(books);
    });
});

app.listen(port, function(){
    console.log('Running port ...', port);
})
