const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(routes);
app.use(express.urlencoded({ extended: true }));

// listener listening for the db connection to start the express server on the correct port
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server is running on port ${PORT}`);
    });
});