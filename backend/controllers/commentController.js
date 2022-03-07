const db = require("../models");
const Comment = db.comments;
const Post = db.posts;

exports.newComment = async (req, res) =>{
    try {
        const post = await Post.findOne({
            where: { id: req.params.id },
            include: [{
                model: db.comments,
                as: 'comment'
            }]
        });
        const newComment = {
            postId: req.params.id,
            userId: req.body.userId,
            content: req.body.content
        };
        await post.addComment(newComment)
        return res.status(201).json({
            message: "Commentaire posté"
        })

    } catch (error) {
        return res.status(500).json({
            error
        });
    }
    // try {
    //     const newComment = {
    //         postId: req.params.id,
    //         userId: req.body.userId,
    //         content: req.body.content
    //     };
    //     await Comment.create(newComment);
    //     return res.status(201).json({
    //         message: "Commentaire posté"
    //     });
    // } catch (error) {
    //     return res.status(500).json({
    //         error
    //     });
    // }
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


exports.deleteComment = async (req,res) =>{
    try {
        const comment = Comment.findOne ({
            where: {postId: req.params.id}
        });
        if(comment){
            await Comment.destroy({where: {postId: req.params.id}})
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