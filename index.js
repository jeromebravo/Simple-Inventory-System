const express = require('express');
const connect = require('./config/db');
const cors = require('cors');
const path = require('path');
const app = express();

// connect to database
connect();

// middleware
app.use(cors());
app.use(express.json());

// define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/product', require('./routes/products'));
app.use('/api/income', require('./routes/income'));
app.use('/api/expense', require('./routes/expense'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/user', require('./routes/user'));

// serve static assets in production
if(process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = 5000;

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));