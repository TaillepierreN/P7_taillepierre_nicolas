const {Router} = require('express');
const { newComment, deleteComment,editComment } = require('../controllers/commentController');
const auth = require('../middlewares/auth');
const isOwnerOrAdmin = require('../middlewares/isOwnerOrAdmin');

const router = Router();

router.post('/',auth, newComment)
router.delete('/:id',auth, isOwnerOrAdmin, deleteComment)
router.put('/:id', auth, isOwnerOrAdmin, editComment)

module.exports = router;