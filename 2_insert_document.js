const database = require('mime-db');
var {dbPromise} = require('./db_connection');

dbPromise.then((database) => {
    //create object
    let subject = {'name':'MERN stack','credit':12}
    database.collection('data').insertOne(subject);
    console.log('Document Added');
}).catch((error) => {
    console.log(error)
});