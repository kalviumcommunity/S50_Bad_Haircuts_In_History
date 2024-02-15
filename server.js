const express = require('express');
const app = express();
const port = 3000;
const DataBase = require("./config/database");
const routes = require('./Routes/route'); 

DataBase();

app.use(express.json());

app.use('/', routes);

// Error handling middleware for unhandled routes
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Error handling middleware for server errors
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

app.listen(port, () => {
  console.log(`🚀 server running on PORT: ${port}`);
});
