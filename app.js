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