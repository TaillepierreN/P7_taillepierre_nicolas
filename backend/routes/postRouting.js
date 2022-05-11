const {Router} = require('express');
const { showMessage, showMessages, postMessage, modifyMessage, deleteMessage,likeSwitch, likeCount } = require('../controllers/postController');
const multer = require('../middlewares/multer-config');
const auth = require('../middlewares/auth');
const isOwnerOrAdmin = require('../middlewares/isOwnerOrAdmin');

const router = Router();

router.get("/:id",auth, showMessage)
router.get('/',auth, showMessages)
router.post('/',auth, multer, postMessage)
router.put('/:id',auth, isOwnerOrAdmin, multer, modifyMessage)
router.delete('/:id',auth, isOwnerOrAdmin, deleteMessage)
router.patch('/:id/like', auth, likeSwitch)
router.get('/:id/like', auth, likeCount)

module.exports = router;