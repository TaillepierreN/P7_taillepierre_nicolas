const express = require('express');
const path = require("path");
const cors = require('cors');
const dotenv = require('dotenv');
const authRouting = require('./routes/authRouting');
const postRouting = require('./routes/postRouting');
const userRouting = require('./routes/userRouting');
const commentRouting = require('./routes/commentRouting');
const users_posts_likeRouting = require('./routes/users_posts_likeRouting');

dotenv.config({
    path: 'config/.env'
});
const app = express();

app.use(express.json());

app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/auth', authRouting);
app.use('/post', postRouting, commentRouting, users_posts_likeRouting);
app.use('/user', userRouting);


const db = require('./models');
db.sequelize.sync();

// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

app.listen(process.env.PORT || 3000);