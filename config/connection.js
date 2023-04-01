const mongoose = require('mongoose');

mongoose.connect(
    preocess.env.MONGODB_URI || 'mongodb',
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }
);

module.exports = mongoose.connection;