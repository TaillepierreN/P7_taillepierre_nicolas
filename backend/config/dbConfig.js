
module.exports= {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'root',
    DB: `groupomania`,
    dialect: 'mysql',
    port: 3310,
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
