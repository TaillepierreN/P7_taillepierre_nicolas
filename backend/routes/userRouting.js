const {Router} = require('express');
const { ModifyUser, deleteUser } = require('../controllers/authController');
const multer = require('../middlewares/multer-config');
const authParams = require('../middlewares/authParams');

router.put('/:id', authParams, multer, ModifyUser )
router.delete('/:id', deleteUser)

const router = Router();

module.exports = routeur;