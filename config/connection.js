const mongoose = require('mongoose');

mongoose.connect(
    preocess.env.MONGODB_URI || 'mongodb', //ask how this should be set up, I think its the version of mongo?
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }
);

module.exports = mongoose.connection;