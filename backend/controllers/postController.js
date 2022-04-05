const db = require("../models");
const Post = db.posts;
const fs = require('fs');


// Afficher tout les posts 
exports.showMessages = async (req, res) => {
    try {

        const posts = await Post.findAll({
            attributes: [
                "id", "title", "content", "updatedAt", "createdAt",
                [
                    db.Sequelize.fn("COUNT", db.Sequelize.col("comments.id")), "commentsCount"
                ],
                [
                    db.Sequelize.fn("COUNT", db.Sequelize.col("likes.postId")), "likesCount"
                ]
            ],
            include: [{
                    model: db.users,
                    as: 'user',
                    attributes: [
                        "id", "username", "profilepic"
                    ]
                },
                {
                    model: db.likes,
                    as: "likes",
                    attributes: [],

                },
                {
                    model: db.comments,
                    as: "comments",
                    attributes: [],
                },

            ],
            order: [
                ["createdAt", "DESC"]
            ],
            group: [
                "post.id"
            ]
        });
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
}

// Afficher un post particulier
exports.showMessage = async (req, res) => {
    try {
        const post = await Post.findOne({
            where: {
                id: req.params.id
            },
            // attributes: [
            //     "id", "title", "content", "likes", "updatedAt", "createdAt",
            //     [
            //         db.Sequelize.fn("COUNT", db.Sequelize.col("comments.id")), "commentsCount"
            //     ]
            // ],
            // group: [
            //     "post.id"
            // ],
            include: [{
                    model: db.users,
                    as: 'user',
                    attributes: ["username", "profilepic", "id"]
                },
                {
                    model: db.comments,
                    as: 'comments',
                    required: false,
                    include: [{
                        model: db.users,
                        as: 'user',
                        attributes: [
                            "id", "username", "profilepic"
                        ]
                    }]
                }
            ],
            order: [
                ["createdAt", "DESC"]
            ]
        });

        if (post) {
            return res.status(200).json(post)
        } else {
            return res.status(404).json({
                message: "aucun post trouvé avec cet ID"
            })
        }
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
}

// Crée un nouveau post
exports.postMessage = async (req, res) => {
    try {
        const newpost = {
            ...req.body
        };
        if (req.file) {
            newpost.attachment = `${req.protocol}://${req.get('host')}//images/attachment/${req.file.filename}`
        }
        await Post.create(newpost);
        return res.status(201).json({
            message: "Post crée"
        });
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
}

// Modifier post existant
exports.modifyMessage = async (req, res) => {
    try {
        const post = Post.findOne({
            where: {
                id: req.params.id
            }
        })
        const postupdate = req.file ? {
            ...req.body,
            attachment: `${req.protocol}://${req.get('host')}//images/attachment/${req.file.filename}`
        } : {
            ...req.body
        }
        if (post) {
            if (req.file) {
                const toDelete = post.attachment.split('/attachment/')[1];
                try {
                    fs.unlinkSync(`/attachment/${toDelete}`)
                } catch (error) {
                    console.error(error)
                }
            }
            await Post.update(postupdate, {
                where: {
                    id: req.params.id
                }
            })
            return res.status(200).json({
                message: "Post mis à jour"
            })
        }
    } catch (error) {
        return res.status(500).json({
            error: error
        });
    }

}

//Supprimer un post
exports.deleteMessage = async (req, res) => {
    try {
        const post = Post.findOne({
            where: {
                id: req.params.id
            }
        })
        if (post) {
            // const toDelete = post.attachment.split('/attachment/')[1];
            // fs.unlinkSync(`/attachment/${toDelete}`);
            await Post.destroy({
                where: {
                    id: req.params.id
                }
            })
            return res.status(200).json({
                message: "Post retiré"
            })
        }
    } catch (error) {
        return res.status(500).json({
            error: error
        });
    }
}