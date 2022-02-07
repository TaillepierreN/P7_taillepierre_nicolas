const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRouting = require('./routes/authRouting');
const forumRouting = require('./routes/forumRouting')

dotenv.config({path: 'config/.env'});
const app = express();

app.use(express.json());

app.use(cors());

app.use('/auth', authRouting);
app.use('/post', forumRouting)

app.listen(3010);