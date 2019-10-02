const express=require('express');

const bookControllers=require('../controllers/book');

const router=express.Router();

router.get('/getbooks',bookControllers.getBooks);
router.post('/create/book', bookControllers.createBook);

module.exports=router;