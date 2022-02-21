const db = require("../models");
const Post = db.posts;

exports.showMessage = async (req, res) => {
    try {

        const posts = await Post.findAll({
            include: [{
                model: db.users,
                as: 'user'
            }],
            order: [
                ["createdAt", "DESC"]
            ]
        });
        if (posts.length > 0) {
            return res.status(200).json('post ' + posts)
        } else {
            return res.status(404).json({
                message: "aucun posts trouvé"
            })
        }
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
}

exports.showMessages = async (req, res) => {
    try {
        const post = await Post.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: db.users,
                as: 'user'
            }],
            order: [
                ["createdAt", "DESC"]
            ]
        });
        if (post.length > 0) {
            return res.status(200).json('post ' + post)
        } else {
            return res.status(404).json({
                message: "aucun posts trouvé"
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
        const newpost = await {
            title: req.body.title,
            content: req.body.content,
            attachment: `${req.protocol}://${req.get('host')}//images/attachment/${req.file.filename}`,
            userId: req.body.userId
        };
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
        const post = Post.findOne({where: { id: req.params.id}})
        if(post){
            await Post.update({
                title: req.body.title,
                content: req.body.content,
                attachment: `${req.protocol}://${req.get('host')}//images/attachment/${req.file.filename}`},
                {where: {id: req.params.id}}
            )
            return res.status(200).json({
                message: "Post mis à jour"
            })
        }
    } catch (error) {
        return res.status(400).json({ error: error});
    }

}

exports.deleteMessage = (req, res) => {
    try {
        const post = Post.findOne({where: { id: req.params.id}})
        if(post){
            await Post.destroy({where: {id: req.params.id}})
            return res.status(200).json({
                message: "Post mis à jour"
            })
        }
    } catch (error) {
        return res.status(400).json({ error: error});
    }
}