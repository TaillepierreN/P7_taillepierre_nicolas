module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define(
        "post", {

            title:{
                type: Sequelize.STRING(45),
                allowNull: false
            },
            content:{
                type: Sequelize.TEXT,
                allowNull: false
            },
            likes:{
                type: Sequelize.INTEGER,
                default: 0
            },
            attachment:{
                type: Sequelize.STRING(255)
            },
            userId:{
                type: Sequelize.INTEGER,
                allowNull: false
            }
            

        }
    );
    return Post;
};