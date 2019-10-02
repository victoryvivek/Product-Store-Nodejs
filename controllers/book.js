const BookModel=require('../model/book');

exports.getBooks=(req,res,next)=>{
  
  BookModel.find().then(books=>{

    res.status(200).json({
      message: "Books got",
      books:books
    });
  }).catch(err=>{
    next(err);
  });
    // res.status(200).json({
    //   message: "Books got"
    //   //books:books
    // });
};

exports.createBook = (req, res, next) => {
    const title=req.body.title;
    const author = req.body.author;
    const price = req.body.price;

    const book=new BookModel({title:title,author:author,price:price});
    book.save().then(result=>{
      console.log(result);
      console.log('Book created');
      return res.status(201).json({
        message: "Books Created",
        book:result
      });
    }).catch(err=>{
      console.log(err);
      next(err);
    });
  
};

exports.deleteBook = (req, res, next) => {
  const bookId=req.params.bookId;
  BookModel.findByIdAndDelete(bookId).then(result=>{
    console.log(result);
    res.status(200).json({
      message: "Book deleted"
    });
  }).catch(err => {
    console.log(err);
    next(err);
  });
  
};

exports.editBook = (req, res, next) => {
  const bookId = req.params.bookId;
  const title = req.body.title;
  const author = req.body.author;
  const price = req.body.price;

  BookModel.findById(bookId).then(book=>{
    book.title=title;
    book.author=author;
    book.price=price;
    return book.save();
  }).then(book=>{
    res.status(200).json({
      message: "Book Edited",
      book:book
    });
  }).catch(err => {
    console.log(err);
    next(err);
  });
  
};