const express = require('express');
const { getConnection } = require('./connect/connection');

const router = express.Router();

router.get('/products'
    , async (req, res) => {
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
      console.log('Returned all products');
    }
  }
});

router.get('/product/:id', async (req, res) => {
    let conn;
    try {
      conn = await getConnection();
      let rows = await conn.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
      
      if (rows.length > 0) {
        res.json(rows[0]);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error fetching products' });
    } finally {
      if (conn) {
        // Close the connection here
        await conn.close();
        console.log('Returned product by ID');
      }
    }
});

module.exports = router;