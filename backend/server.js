const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRouting = require('./routes/authRouting');
const postRouting = require('./routes/postRouting');
const userRouting = require('./routes/userRouting');
const commentRouting = require('./routes/commentRouting');

dotenv.config({
    path: 'config/.env'
});
const app = express();

app.use(express.json());

app.use(cors());

app.use('/auth', authRouting);
app.use('/post', postRouting, commentRouting);
app.use('/user', userRouting);
// app.use('/post', commentRouting)

const db = require('./models');
db.sequelize.sync();

// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

app.listen(process.env.PORT || 3000);