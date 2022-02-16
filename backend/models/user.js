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
                defaultValue: false
            },
            profilepic:{
                type: Sequelize.STRING(255),
                allowNull: true
            }
        });
    return User;
};