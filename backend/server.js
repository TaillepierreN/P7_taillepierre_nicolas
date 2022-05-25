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

////////////////////////////////////////////////////////////////
// Commenter si besoin de remise à zéro complet de la base de //
// donnée                                                     //
////////////////////////////////////////////////////////////////

db.sequelize.sync();

/////////////////////////////////
// puis décommenter ces lignes //
/////////////////////////////////

// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

///////////////////////////////////////////////////////////
//Pensez à bien décommenter et recommenter ces deux bloc //
//une fois la remise a zéro effectuée                    //
///////////////////////////////////////////////////////////



app.listen(process.env.PORT || 3000);