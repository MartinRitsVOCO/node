// Import Express
const express = require('express');
const apiRoutes = require('./apiRoutes');

const app = express();
app.use(express.json());

// Define a route
app.use('/', apiRoutes);

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});