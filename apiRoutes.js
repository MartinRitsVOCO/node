const express = require('express');
const { getConnection } = require('./connect/connection');

const router = express.Router();

router.get('/products', async (req, res) => {
  let conn;
  try {
    conn = await getConnection();
    let rows = await conn.query('SELECT * FROM products');
    
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching products' });
  } finally {
    if (conn) {
      // Close the connection here
      await conn.close();
      console.log('Connection closed');
    }
  }
});

module.exports = router;