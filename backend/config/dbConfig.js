const Sequelize = require("sequelize");


const db = new Sequelize('groupomania', process.env.MYSQLROOT, process.env.MYSQLPASS, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3310,
    pool:{
        max:100,
        min: 0
    },
});

db.authenticate().then(()=> {
    console.log('Connection has been established successfully.');
})
  .catch ((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db;