const express = require('express');
const path = require("path");
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

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/auth', authRouting);
app.use('/post', postRouting);
app.use('/user', userRouting);
app.use('/comment', commentRouting);


const db = require('./models');

//////////////////////////////////////////////////////////////////////
// A commenter après la premiere initialisation de la base de donnée//
//////////////////////////////////////////////////////////////////////

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});

//////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////
// A décommenter après la premiere initialisation de la base de donnée/
///////////////////////////////////////////////////////////////////////

// db.sequelize.sync();

///////////////////////////////////////////////////////////////////////

app.listen(process.env.PORT || 3000);