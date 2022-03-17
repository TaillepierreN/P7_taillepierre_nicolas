const db = require("../models");
const Comment = db.comments;

//Ajout nouveau commentaire
exports.newComment = async (req, res) => {
    try {
        const newComment = {
            postId: parseInt(req.params.id),
            userId: req.body.userId,
            content: req.body.content
        };
        await Comment.create(newComment)
        return res.status(201).json({
            message: "Commentaire posté"
        })

    } catch (error) {
        return res.status(500).json({
            error
        });
    }
}

// Supprimer commentaire
exports.deleteComment = async (req, res) => {
    try {
        const comment = Comment.findOne({
            where: {
                id: req.params.comId
            }
        });
        if (comment) {
            await Comment.destroy({
                where: {
                    id: req.params.comId
                }
            })
            return res.status(200).json({
                message: "Commentaire supprimé"
            })
        }
    } catch (error) {
        return res.status(500).json({
            error
        });
    }
}