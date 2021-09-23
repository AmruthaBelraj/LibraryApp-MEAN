const express = require('express');
const bookData = require('./src/model/bookData');
const authorData = require('./src/model/authorData');
const cors = require('cors');
const jwt = require('jsonwebtoken');
var app = new express();
app.use(cors());
app.use(express.json())
username="admin"
password="1234"

function verifyToken(req,res, next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split('')[1];
    if (token === 'null'){
        return res.status(401).send('Unauthorized request');
    }
    let payload=jwt.verify(token,'secretKey');
    if (!payload){
        return res.status(401).send('Unauthorized request');
    }
    req.userId=payload.subject
    next()
}

app.post('/login', (req, res)=> {
    let userData = req.body


        if (!username) {
            res.status(401).send('Invalid Username')
        } else
        if ( password !== userData.password ) {
            res.status(401).send('Invalid Password')
        }else {
            let payload={subject:username+password}
            let token=jwt.sign(payload,'secretKey')
            res.status(200).send({token})
        }
});

app.get('/books',function(req,res){
    bookData.find()
                .then(function(books){
                    res.send(books);
                });
});

app.get('/authors',function(req,res){
    authorData.find()
                .then(function(authors){
                    res.send(authors);
                });
});

app.get('/:id',  (req, res) => {
  
    const id = req.params.id;
      bookData.findOne({"_id":id})
      .then((book)=>{
          res.send(book);
      });
});

app.get('/:id',  (req, res) => {
  
    const id = req.params.id;
      authorData.findOne({"_id":id})
      .then((author)=>{
          res.send(author);
      });
});

app.post('/insert',function(req,res){
    console.log(req.body);
    var book = {
        bookName : req.body.book.bookName,
        bookAuthor : req.body.book.bookAuthor,
        bookGenre : req.body.book.bookGenre,
        imageUrl : req.body.book.imageUrl,
    }
    var book = new bookData(book);
    book.save();
});

app.post('/insert/author',function(req,res){
    console.log(req.body);
    var author = {
        authorName : req.body.author.authorName,
        bookName : req.body.author.bookName,
        bookGenre : req.body.author.bookGenre,
        imageUrl : req.body.author.imageUrl,
    }
    var author = new authorData(author);
    author.save();
});

app.put('/edit',(req,res)=>{
    console.log(req.body)
    id=req.body._id,
    bookName = req.body.bookName,
    bookAuthor= req.body.bookAuthor,
    bookGenre = req.body.bookGenre,
    imageUrl = req.body.imageUrl
   bookData.findByIdAndEdit({"_id":id},
                                {$set:{"bookName":bookName,
                                "bookAuthor":bookAuthor,
                                "bookGenre":bookGenre,
                                "imageUrl":imageUrl}})
   .then(function(){
       res.send();
   });
 });

 app.put('/update/author',(req,res)=>{
    console.log(req.body)
    id=req.body._id,
    authorName = req.body.authorName,
    bookName= req.body.bookName,
    bookGenre = req.body.bookGenre,
    imageUrl = req.body.imageUrl
   authorData.findByIdAndEdit({"_id":id},
                                {$set:{"authorName":authorName,
                                "bookName":bookName,
                                "bookGenre":bookGenre,
                                "imageUrl":imageUrl}})
   .then(function(){
       res.send();
   });
 });
 
app.delete('/remove/:id',(req,res)=>{
 
   id = req.params.id;
   bookData.findByIdAndDelete({"_id":id})
   .then(()=>{
       console.log('success')
       res.send();
   });
 });

 app.delete('/remove/author/:id',(req,res)=>{
 
    id = req.params.id;
    authorData.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('success')
        res.send();
    });
  });

app.listen(3000, function(){
    console.log('listening to port 3000');
});