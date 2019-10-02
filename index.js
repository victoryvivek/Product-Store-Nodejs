const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');

const bookRoutes = require('./routes/book');
const userRoutes = require('./routes/user');

const app=express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.use('/book',bookRoutes);
app.use('/user', userRoutes);

app.use((error,req,res,next)=>{ 
  const statusCode=error.statusCode || 500;
  const message=error.message;

  return res.status(statusCode).json({
    message:message
  });
});

mongoose
  .connect(
    "mongodb+srv://victory_vivek:vivek123@book-cluster-od9xo.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology:true
    }
  )
  .then(result => {
    app.listen(8080,()=>{
      console.log("db connected");
    });
    
  })
  .catch(err => {
    console.log('Error in code');
    console.log(err);
  });

// mongoose
//   .connect(
//     'mongodb+srv://victory_vivek:vivek123@book-cluster-od9xo.mongodb.net/test?retryWrites=true&w=majority'
//   )
//   .then(result => {
//     app.listen(8080);
//     console.log('db connected');
//   })
//   .catch(err => console.log(err));