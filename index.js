const express=require('express');
const bodyParser=require('body-parser');
const monsgoose=require('mongoose');

const bookRoutes = require('./routes/book');

const app=express();

app.use(bodyParser.json());

app.use('/book',bookRoutes);

monsgoose
  .connect(
    "mongodb+srv://victory_vivek:vivek123@book-cluster-od9xo.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true
    }
  )
  .then(result => {
    app.listen(8080);
    console.log("db connected");
  })
  .catch(err => console.log(err));