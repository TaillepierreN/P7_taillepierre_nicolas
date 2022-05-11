const {Router} = require('express');
const { modifyUser, deleteUser, showUser } = require('../controllers/userController');
const auth = require('../middlewares/auth');
const isOwnerOrAdmin = require('../middlewares/isOwnerOrAdmin');
const multer = require('../middlewares/multer-config');

const router = Router();

router.put('/:id', auth,  isOwnerOrAdmin, multer, modifyUser )
router.delete('/:id', auth, isOwnerOrAdmin, multer, deleteUser)
router.get('/:id',auth, multer, showUser)


module.exports = router;