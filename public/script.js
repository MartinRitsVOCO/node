// Get elements
const productIdInput = document.getElementById('product-id');
const getProductButton = document.getElementById('get-product');
const productDataDiv = document.getElementById('product-data');

// Create WebSocket connection
const socket = new WebSocket('ws://localhost:3000');

// Handle form submission
getProductButton.addEventListener('click', (event) => {
    event.preventDefault();
    const productId = parseInt(productIdInput.value);
    
    if (!isNaN(productId) && productId > 0) {
        // Clear previous data
        productDataDiv.innerHTML = '';
        
        // Display loading message
        productDataDiv.textContent = 'Loading product data...';
        
        // Send product ID via WebSocket
        socket.send(JSON.stringify({ type: 'getProduct', id: productId }));
    } else {
        alert('Please enter a valid product ID');
    }
});

// Handle WebSocket messages
socket.onmessage = function(event) {
    console.log(event.data);
    const data = JSON.parse(event.data);
    
    if (data.type === 'product' && data.id !== undefined) {
        // Display product data
        productDataDiv.innerHTML = `
            <h2>Product ${data.id}</h2>
            <p>Name: ${data.title}</p>
            <p>Description: ${data.description}</p>
            <p>Price: $${data.price}</p>
        `;
        
        console.log('Received product:', data);
    } else if (data.error) {
        // Display error message
        productDataDiv.textContent = `Error: ${data.error}`;
    }
};