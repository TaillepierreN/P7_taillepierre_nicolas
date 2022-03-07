const {Router} = require('express');
const { newComment, showPostComments, deleteComment } = require('../controllers/commentController');
const router = Router();

router.post('/:id/comment', newComment)
// router.get('/:id/comment', showPostComments)
router.delete('/:id/comment/:comId', deleteComment)

module.exports = router;