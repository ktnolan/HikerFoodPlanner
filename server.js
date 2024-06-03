const express = require('express');
const path = require('path');
const foods = require('./foods'); // Import the foods data
const app = express();
const PORT = 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to get the food data
app.get('/api/foods', (req, res) => {
    res.json(foods);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
