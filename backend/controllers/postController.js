const db = require("../models");
const Post = db.posts;
const Likes = db.likes;
const fs = require('fs');


// Afficher tout les posts 
exports.showMessages = async (req, res) => {
    try {
        const query = {
            attributes: [
                "id", "title", "content", "updatedAt", "createdAt", "attachment",
                [
                    db.Sequelize.fn("COUNT", db.Sequelize.col("comments.postId")), "commentsCount"
                ],
                // [
                //     db.Sequelize.fn("COUNT", db.Sequelize.col("likes.postId")), "likesCount"
                // ]
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
        }
        //Récupere que les message lié a l'utilisateur pour la page profile
        if (req.query.userId) {
            query.where = {
                userId: req.query.userId
            }
        }
        const posts = await Post.findAll(query);
        // posts.forEach(post => {
        //     const likeCount = Likes.count({
        //         where: { postId: post.id }
        //     })
        //     return post.likeCount = likeCount
        // });
        // console.log(posts.likeCount)
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({
            message: error
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
            attributes: ["id", "title", "content", "updatedAt", "createdAt", "attachment",
            ],
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
            },
            {
                model: db.likes,
                as: "likes",
                attributes: [
                    "userid"
                ]
            },
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
            message: error
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
            newpost.attachment = `${req.protocol}://${req.get('host')}/images/attachment/${req.file.filename}`
        }
        await Post.create(newpost);
        return res.status(201).json({
            message: "Post crée"
        });
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

// Modifier post existant
exports.modifyMessage = async (req, res) => {
    try {
        const post = await Post.findOne({
            where: {
                id: req.params.id
            }
        })
        console.log(req.body)
        const postupdate = req.file ? {
            ...req.body,
            attachment: `${req.protocol}://${req.get('host')}/images/attachment/${req.file.filename}`
        } : {
            ...req.body
        }
        if (post) {
            let toDelete
            if (post.attachment && req.file) {
                toDelete = post.attachment.split('/attachment/')[1];
            }
            await Post.update(postupdate, {
                where: {
                    id: req.params.id
                }
            })
            if (toDelete) {
                fs.unlinkSync(`images/attachment/${toDelete}`)
            }
            return res.status(200).json({
                message: "Post mis à jour"
            })
        } else {
            return res.status(404).json({
                message: "Post non trouvé"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
}

//Supprimer un post
exports.deleteMessage = async (req, res) => {
    try {
        const post = await Post.findOne({
            where: {
                id: req.params.id
            }
        })
        if (post) {
            let toDelete;
            if (post.attachment) {
                toDelete = post.attachment.split('/attachment/')[1];
            }
            await Post.destroy({
                where: {
                    id: req.params.id
                }
            })
            if (toDelete) {
                fs.unlinkSync(`images/attachment/${toDelete}`);
            }
            return res.status(200).json({
                message: "Post retiré"
            })
        } else {
            return res.status(404).json({
                message: "Post non trouvé"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
}

// Ajout ou enleve le status like sur un post (un like par user)
exports.likeSwitch = async (req, res) => {
    try {
        const likeList = await Likes.findOne({
            where: {
                userId: req.body.userId,
                postId: req.params.id
            }
        });
        if (!likeList) {
            const newLike = {
                postId: req.params.id,
                userId: req.body.userId
            };
            await Likes.create(newLike);
            return res.status(201).json({ message: "Post liké" })
        } else {
            await Likes.destroy({
                where: {
                    postId: req.params.id,
                    userId: req.body.userId
                }
            });
            return res.status(200).json({ message: "Like retiré" })
        }
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

// Compte le nombre de like du post
exports.likeCount = async (req, res) => {
    try {
        const likeCounter = await Likes.findAndCountAll({
            where: { postId: req.params.id }
        })
        return res.status(200).json(likeCounter.count);
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}