const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRouting = require('./routes/authRouting');
const forumRouting = require('./routes/forumRouting');
const userRouting = require('./routes/userRouting');

dotenv.config({path: 'config/.env'});
require('./config/dbConfig');
const app = express();

app.use(express.json());

app.use(cors());

app.use('/auth', authRouting);
app.use('/post', forumRouting);
app.use('/user', userRouting);

app.listen(process.env.PORT || 3000);