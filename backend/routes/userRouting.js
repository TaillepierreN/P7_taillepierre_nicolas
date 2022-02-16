const {Router} = require('express');
const { ModifyUser, deleteUser } = require('../controllers/userController');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

const router = Router();

router.put('/:id', auth, multer, ModifyUser )
router.delete('/:id', auth, deleteUser)


module.exports = router;