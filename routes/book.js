const express=require('express');

const bookControllers=require('../controllers/book');
const isAuth = require('../middleware/isAuthorised');

const router=express.Router();

router.get('/getbooks',isAuth,bookControllers.getBooks);
router.post('/create/book',isAuth, bookControllers.createBook);
router.put('/edit/:bookId',isAuth, bookControllers.editBook);
router.delete('/delete/:bookId',isAuth, bookControllers.deleteBook);

module.exports=router;
