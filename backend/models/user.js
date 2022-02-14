module.exports = (db, Sequelize) => {
    return db.define(
        "user", {
            id:{
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true ,
                allowNull: false
            },
            email:{ 
                type: Sequelize.DataTypes.STRING(45),
                allowNull: false,
                unique: true
            },
            password:{ 
                type: Sequelize.DataTypes.STRING(255),
                allowNull: false
            },
            username:{ 
                type: Sequelize.DataTypes.STRING(45),
                allowNull: false
            },
            isAdmin:{
                type: Sequelize.DataTypes.BOOLEAN,
                default: 0
            }
        })}