const {Router} = require('express');
const { newComment, deleteComment } = require('../controllers/commentController');
const router = Router();

router.post('/:id/comment', newComment)
router.delete('/:id/comment/:comId', deleteComment)

module.exports = router;