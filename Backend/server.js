require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const DataBase = require("./config/database");
const routes = require('./Routes/route'); 
const post = require('./Routes/post'); 
const cors = require('cors'); 

DataBase();

app.use(express.json());
app.use(cors());
app.use('/', routes);
app.use('/', post);

// Error handling middleware for unhandled routes
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Error handling middleware for server errors
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
});

app.listen(port, () => {
  console.log(`🚀 server running on PORT: ${port}`);
});
