const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!doesExist(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});
const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }
  
// Get the book list available in the shop
public_users.get('/',async (req, res)=> {
  //Write your code here
  return new Promise((resolve, reject)=>{
      resolve(books)
  }).then(books=>{
      res.status(300).json(books)
  }).catch(err=>{
      res.status(500).json({error: err.message})
  })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async (req, res)=>{
  //Write your code here
  return new Promise((resolve, reject)=>{
    const isbn = req.params.isbn;
    resolve(books[isbn])
  }).then(books=>{
      res.status(300).json(books)
  }).catch(err=>{
      res.status(500).json({error: err.message})
  })
 });
  
// Get book details based on author
public_users.get('/author/:author',async (req, res)=> {
  //Write your code here
  return new Promise((resolve, reject)=>{
    const author = req.params.author;
    const filtered = Object.values(books).filter((book)=>book.author===author)
    resolve(filtered)
  }).then(filtered=>{
      res.status(300).json(filtered)
  }).catch(err=>{
      res.status(500).json({error: err.message})
  })
});

// Get all books based on title
public_users.get('/title/:title',async (req, res)=> {
  //Write your code here
  return new Promise((resolve, reject)=>{
    const title = req.params.title;
    const filtered = Object.values(books).filter((book)=>book.title===title)
    resolve(filtered)
  }).then(title=>{
      res.status(300).json(title)
  }).catch(err=>{
      res.status(500).json({error: err.message})
  })
});

//  Get book review
public_users.get('/review/:isbn',async (req, res)=> {
  //Write your code here
  return new Promise((resolve, reject)=>{
    const isbn = req.params.isbn;
    const bookReviews = books[isbn].reviews
    resolve(bookReviews)
  }).then(bookReviews=>{
      res.status(300).json(bookReviews)
  }).catch(err=>{
      res.status(500).json({error: err.message})
  })
});

module.exports.general = public_users;
