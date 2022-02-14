module.exports = (db, Sequelize) => {
    return db.define(
        "post", {
            id:{
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true ,
                allowNull: false
            },
            title:{
                type: Sequelize.DataTypes.STRING(45),
                allowNull: false
            },
            content:{
                type: Sequelize.DataTypes.TEXT,
                allowNull: false
            },
            likes:{
                type: Sequelize.DataType.INTEGER,
                default: 0
            },
            attachment:{
                type: Sequelize.DataType.STRING(255)
            }

        }
    )
}