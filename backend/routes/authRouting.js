const {Router} = require('express');
const { signup, login, deleteUser, ModifyUser } = require('../controllers/authController');
const authParams = require('../middlewares/authParams');
const multer = require('../middlewares/multer-config');

const router = Router();

router.post('/signup', authParams , multer, signup)
router.post('/login', authParams, login)
router.put('/modUser/:id', authParams, multer, ModifyUser )
router.delete('/delUser/:id', deleteUser)


module.exports = router;