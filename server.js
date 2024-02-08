const express = require('express');
const app = express();
const port = 3000;

// define the ping route with the response in JSON
app.get('/', (req, res) => {
  res.json({ name: 'Vivan Raj Mittakodi' });
});


app.listen(port, () => {
    console.log(`🚀 server running on PORT: ${port}`);
});
