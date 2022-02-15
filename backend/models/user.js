module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
        "user", {
            id:{
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true ,
                allowNull: false
            },
            email:{ 
                type: Sequelize.STRING(45),
                allowNull: false,
                unique: true
            },
            password:{ 
                type: Sequelize.STRING(255),
                allowNull: false
            },
            username:{ 
                type: Sequelize.STRING(45),
                allowNull: false
            },
            isAdmin:{
                type: Sequelize.BOOLEAN,
                default: false
            }
        });
    return User;
};