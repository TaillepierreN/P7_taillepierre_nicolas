const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRouting = require('./routes/authRouting');
const forumRouting = require('./routes/forumRouting');
const userRouting = require('./routes/userRouting');

dotenv.config({
    path: 'config/.env'
});
const app = express();

app.use(express.json());

app.use(cors());

app.use('/auth', authRouting);
app.use('/post', forumRouting);
app.use('/user', userRouting);

const db = require('./models');
db.sequelize.sync();

// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

app.listen(process.env.PORT || 3000);