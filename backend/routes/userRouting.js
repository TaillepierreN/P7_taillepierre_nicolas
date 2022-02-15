const {Router} = require('express');
const { ModifyUser, deleteUser } = require('../controllers/userController');
const multer = require('../middlewares/multer-config');
const authParams = require('../middlewares/authParams');
const router = Router();

router.put('/:id', authParams, multer, ModifyUser )
router.delete('/:id', deleteUser)


module.exports = router;