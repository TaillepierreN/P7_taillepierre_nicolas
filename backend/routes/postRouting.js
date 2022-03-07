const {Router} = require('express');
const { showMessage, showMessages, postMessage, modifyMessage, deleteMessage } = require('../controllers/postController');
const multer = require('../middlewares/multer-config');

const router = Router();

router.get("/:id", showMessage)
router.get('/', showMessages)
router.post('/', multer, postMessage)
router.put('/:id', multer, modifyMessage)
router.delete('/:id', deleteMessage)

module.exports = router;