// Import Express
const express = require('express');
const WebSocket = require('ws');
const http = require('http');

const apiRoutes = require('./apiRoutes');

const app = express();
// Middleware to parse JSON data for /api requests
app.use('/api', express.json());
// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define a route
app.use('/api', apiRoutes);

const server = http.createServer(app);

// Set up a WebSocket server
const wss = new WebSocket.Server({ server });

wss.on('connection', function(ws) {
    ws.on('message', function incoming(message) {
        const data = JSON.parse(message);
        const id = data.id;
        fetchProduct(id, ws);
    });
});

// Function to fetch a product from the API
function fetchProduct(id, ws) {
    const url = `http://localhost:3000/api/product/${id}`;
    
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Add type field to match client expectations
        const responseData = {
            type: 'product',
            ...data
        };
        console.log('Sending product:', responseData);
        ws.send(JSON.stringify(responseData));
    })
    .catch(error => {
        console.error('Error fetching product:', error);
        ws.send(JSON.stringify({ type: 'error', error: 'Failed to fetch product' }));
    });
}
// Start the server
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});