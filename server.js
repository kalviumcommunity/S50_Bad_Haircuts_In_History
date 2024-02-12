const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port or default to 3000

// Define the ping route with the response in JSON
app.get('/', (req, res) => {
  res.json({ name: 'Vivan Raj Mittakodi' });
});

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

