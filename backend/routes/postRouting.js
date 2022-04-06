const {Router} = require('express');
const { showMessage, showMessages, postMessage, modifyMessage, deleteMessage } = require('../controllers/postController');
const multer = require('../middlewares/multer-config');
const auth = require('../middlewares/auth');

const router = Router();

router.get("/:id",auth, showMessage)
router.get('/',auth, showMessages)
router.post('/',auth, multer, postMessage)
router.put('/:id',auth, multer, modifyMessage)
router.delete('/:id',auth, multer, deleteMessage)

module.exports = router;