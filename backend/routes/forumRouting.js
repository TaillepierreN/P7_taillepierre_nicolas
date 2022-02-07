const {Router} = require('express');
const { showMessage, showMessages, postMessage, modifyMessage, deleteMessage } = require('../controllers/forumController');
const multer = require('../middlewares/multer-config');

const router = Router();

router.get("/:id", showMessage)
router.get('/', showMessages)
router.post('/new', multer, postMessage)
router.put('/update/:id', multer, modifyMessage)
router.delete('/delete/:id', deleteMessage)

module.exports = router;