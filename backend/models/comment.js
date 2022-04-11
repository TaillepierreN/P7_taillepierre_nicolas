module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define(
        "comment", {
            content:{
                type: Sequelize.TEXT,
                allowNull: false
            },
            postId:{
                type: Sequelize.INTEGER,
                allowNull: false
            },
            userId:{
                type: Sequelize.INTEGER,
                allowNull: false
            }
        }
    );
    return Comment;
};