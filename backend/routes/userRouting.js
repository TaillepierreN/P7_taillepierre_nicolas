const {Router} = require('express');
const { ModifyUser, deleteUser, showUser } = require('../controllers/userController');
const auth = require('../middlewares/auth');
const isOwnerOrAdmin = require('../middlewares/isOwnerOrAdmin');
const multer = require('../middlewares/multer-config');

const router = Router();

router.put('/:id', auth, isOwnerOrAdmin, multer, ModifyUser )
router.delete('/:id', auth, isOwnerOrAdmin, multer, deleteUser)
router.get('/:id',auth, multer, showUser)


module.exports = router;