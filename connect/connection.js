const mariadb = require('mariadb');
const credentials = require('../credentials.json');

async function getConnection() {
    try {
        // Create a new connection
        const conn = await mariadb.createConnection(credentials);

        // Print connection thread
        console.log(`Connected! (id=${conn.threadId})`);

        // Return connection
        return conn;
    } catch (err) {
        // Print error
        console.log(err);
    }
}

module.exports = { getConnection };