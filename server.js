const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/movie-app');

const db = mongoose.connection;
db.on('connected', () => console.log('MongoDB connected'));
db.on('error', (err) => console.log('Error:', err));

app.use('/api/movies', require('./routes/movies'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});
