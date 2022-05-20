const db = require("../models");
const Comment = db.comments;

//Ajout nouveau commentaire
exports.newComment = async (req, res) => {
    try {
        await Comment.create(req.body)
        return res.status(201).json({
            message: "Commentaire posté"
        })

    } catch (error) {
        return res.status(500).json({
            error
        });
    }
}

//editer commentaire
exports.editComment = async (req, res) => {
    try {
        const editComment = await Comment.findOne({
            where: {
                id: req.params.id,
            }
        });
        if (editComment) {
            const updatecom = req.body.content
            await Comment.update(
                { content: updatecom },
                {
                    where: {
                        id: req.params.id,
                    }
                })
            return res.status(200).json({
                message: "Commentaire mis à jour"
            })
        } else {
            return res.status(404).json({
                message: "Commentaire non trouvé"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}


// Supprimer commentaire
exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findOne({
            where: {
                id: req.params.id
            }
        });
        if (comment) {
            await Comment.destroy({
                where: {
                    id: req.params.id
                }
            })
            return res.status(200).json({
                message: "Commentaire supprimé"
            })
        } else {
            return res.status(404).json({
                message: "Commentaire non trouvé"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
}