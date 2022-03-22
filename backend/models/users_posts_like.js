const db = require("../models");

module.exports = (sequelize, Sequelize) => {
    const Likes = sequelize.define(
        "likes", {
            userId:{ 
                type: Sequelize.INTEGER,
                references: {
                    model: db.users,
                    key: 'id'
                }
            },
            postId:{ 
                type: Sequelize.INTEGER,
                references: {
                    model: db.posts,
                    key: 'id'
                }
            }
        },
        {
            indexes: [
                {
                    name: 'unique_index',
                    unique: true,
                    fields: ['userId','postId']
                }
            ]
        });
    return Likes;
};