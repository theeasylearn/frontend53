var { MongoClient } = require('mongodb');
var url = "mongodb://127.0.0.1:27017";
var dbName = "frontend53"; // Replace with your actual database name
var client = new MongoClient(url);
var dbPromise = client.connect().then(() => {
    console.log("Connected to MongoDB");
    return client.db(dbName); // retrieves a specific database from the connected MongoDB server.
}).catch(err => {
    console.error("Database connection error:", err);
    throw err;
});
module.exports = { dbPromise };