const {Router} = require('express');
const { newComment, deleteComment } = require('../controllers/commentController');
const auth = require('../middlewares/auth');

const router = Router();

router.post('/:id/comment',auth, newComment)
router.delete('/:id/comment/:comId',auth, deleteComment)

module.exports = router;