const express=require('express');

const bookControllers=require('../controllers/book');
const isAuth = require('../middleware/isAuthorised');

const router=express.Router();

router.get('/getbooks',bookControllers.getBooks);
router.post('/create/book', bookControllers.createBook);
router.put('/edit/:bookId', bookControllers.editBook);
router.delete('/delete/:bookId', bookControllers.deleteBook);

module.exports=router;