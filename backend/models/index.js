const dbConfig = require('../config/dbconfig.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./user.js")(sequelize, Sequelize);
db.posts = require("./post.js")(sequelize, Sequelize);
db.comments = require("./comment.js")(sequelize, Sequelize);

db.users.hasMany(db.posts, { as: "posts"});
db.posts.belongsTo(db.users, { foreignKey: "userId", as: "user"});
db.users.hasMany(db.comments, { as: "comments"});
db.comments.belongsTo(db.users, { foreignKey: "userId", as: "user"});
db.posts.hasMany(db.comments, { as: "comments"});
db.comments.belongsTo(db.posts, {foreignKey: "postId", as: "post"})


module.exports = db;