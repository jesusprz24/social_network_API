const mongoose = require('mongoose');

mongoose.connect(
    preocess.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social-network-api', 
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }
);

module.exports = mongoose.connection;