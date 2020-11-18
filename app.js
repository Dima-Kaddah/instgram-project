const path = require('path');
const express = require('express');
const app = express();
const connectDB = require('./util/connectDB');

app.use(express.json());


//server listen
const port = process.env.PORT || 5000;
const server = () => {
  app.listen(port, () => {
    console.log(`Listening to port ${port}!`);
  });
};
//db
connectDB(server);