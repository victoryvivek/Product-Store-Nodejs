const BookModel=require('../model/book');

exports.getBooks=(req,res,next)=>{
    res.status(200).json({
        message:"Books got"
    });
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
    });
  
};

exports.deleteBook = (req, res, next) => {
    const bookId=req.params.bookId;
  res.status(200).json({
    message: "Book deleted"
  });
};

exports.editBook = (req, res, next) => {
    const bookId = req.params.bookId;
  res.status(200).json({
    message: "Book Edited"
  });
};