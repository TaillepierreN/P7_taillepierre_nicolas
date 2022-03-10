const db = require("../models");
const Post = db.posts;
const Comment = db.comments;


exports.showMessages = async (req, res) => {
    try {

        const posts = await Post.findAll({
            attributes: {
                include: [[Sequelize.fn("COUNT", Sequelize.col("comments.id")),"comnum"]]
            },
            include: [{
                model: db.users,
                as: 'user'
            },
            {
                model:Comment,
                as: 'comments',
            attributes:[]}
         ],
            order: [
                ["createdAt", "DESC"]
            ]
        });
        // const comnum = await Comment.count({
        //     col: 'postId',
        //     where: {
        //         postId: posts.id
        //     }
        // })
        return res.status(200).json(posts, comnum);
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
}


exports.showMessage = async (req, res) => {
    try {
        const post = await Post.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                    model: db.users,
                    as: 'user'
                },
                {
                    model: db.comments,
                    as: 'comment'
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

exports.modifyMessage = async (req, res) => {
    try {
        const post = Post.findOne({
            where: {
                id: req.params.id
            }
        })
        if (post) {
            await Post.update({
                title: req.body.title,
                content: req.body.content,
                attachment: `${req.protocol}://${req.get('host')}//images/attachment/${req.file.filename}`
            }, {
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

exports.deleteMessage = async (req, res) => {
    try {
        const post = Post.findOne({
            where: {
                id: req.params.id
            }
        })
        if (post) {
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