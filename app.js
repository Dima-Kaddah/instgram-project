const path = require('path');
const morgan = require('morgan');
const express = require('express');
const app = express();
const connectDB = require('./util/connectDB');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');

//middleware
app.use(morgan('dev')); //give route in console//good for 

app.use(express.json());

//middleware to allow connect between 3000,5000 servers// its open to any domain//set more headers//for CORS cross origin resorse shearing error... that the requset must be from same sever .... this code bellow make the access

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');

  next(); // to let complete journey to other middlewares :)
});

//routes
app.use('/api', userRoute);
app.use('/api', postRoute);

//server listen
const port = process.env.PORT || 5000;
const server = () => {
  app.listen(port, () => {
    console.log(`Listening to port ${port}!`);
  });
};
//db
connectDB(server);