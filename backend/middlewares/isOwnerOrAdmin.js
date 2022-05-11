const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.users;
const Post = db.posts;
const Comment = db.comments;

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        const userId = decodedToken.userId;
        const user = await User.findOne({ where: { id: userId } })
        if (user.isAdmin || user.isMod) {
            next();
        } else {
            switch (req.baseUrl) {
                case '/user':
                    if (userId === parseInt(req.params.id)) {
                        next();
                    } else {
                        res.status(403).json({ message: "Vous n'avez pas le droit de modifier cet utilisateur" })
                    }
                    break;
                case '/post':
                    const post = await Post.findOne({ where: { id: req.params.id } })
                    if (userId === post.userId) {
                        next();
                    } else {
                        res.status(403).json({ message: "Vous n'avez pas le droit de modifier ce post" })
                    }
                    break;
                case '/comment':
                    const comment = await Comment.findOne({ where: { id: req.params.id } })
                    if (userId === comment.userId) {
                        next();
                    } else {
                        res.status(403).json({ message: "Vous n'avez pas le droit de modifier ce commentaire" })
                    }
                    break;
            }
        }
    } catch (error) {
        return res.status(401).json({
            message: 'Forbidden request'
        });
    }
}