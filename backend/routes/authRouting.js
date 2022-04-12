const {Router} = require('express');
const { signup, login} = require('../controllers/authController');
const authParams = require('../middlewares/authParams');
const multer = require('../middlewares/multer-config');

const router = Router();

router.post('/signup',  multer, authParams , signup)
router.post('/login', authParams, login)


module.exports = router;