const db = require('../models');
const Likes = db.likes;


// Ajout ou enleve le status like sur un post (un like par user)
exports.likeSwitch = async (req, res) =>{
    try {
        const likeList = await Likes.findOne({
            where: {
                userId: req.body.userId,
                postId: req.params.id
            }
        });
        if(!likeList){
            const newLike = {
                postId: req.params.id,
                userId: req.body.userId
            };
            await Likes.create(newLike);
            return res.status(201).json({ message: "Post liké"})
        } else {
            await Likes.destroy({
                where: {
                    postId: req.params.id,
                    userId: req.body.userId
                }
            });
            return res.status(200).json({ message: "Like retiré"})
        }
    } catch (error) {
        return res.status(500).json({ error })
    }
}

// Compte le nombre de like du post
exports.likeCount = async(req, res) =>{
    try {
        const likeCounter = await Likes.findAndCountAll({
            where: { postId: req.params.id}
        })
        return res.status(200).json(likeCounter.count);
    } catch (error) {
        return res.status(500).json({ error })
    }
}