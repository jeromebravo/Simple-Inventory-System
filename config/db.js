const mongoose = require('mongoose');
const config = require('config');

const mongoURI = config.get('mongoURI');

const connect = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        console.log('MongoDB connected');
    } catch(err) {
        console.error(err);
    }
}

module.exports = connect;