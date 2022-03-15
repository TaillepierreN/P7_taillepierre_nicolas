const db = require("../models");
const Comment = db.comments;
const Post = db.posts;

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

// exports.showPostComments = async (req,res) =>{
//     try {
//         const comments = await Comments.findAll({
//             where: {postId: req.params.id},
//             include: [{model: db.users, as: 'user'}, {model: db.posts, as: 'post'}],
//             order: [ ["createdAt", "DESC"]] 
//         });
//         if( comments.length > 0) {
//             return res.status(200).json(comments)
//         } else{
//             return res.status(404).json({ message: "aucun commentaire"});
//         }
//     } catch (error) {
//         return res.status(500).json({
//             error
//         });
//     }
// }


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