const {Router} = require ('express');
const { likeSwitch, likeCount } = require('../controllers/users_posts_likeController');
const auth = require('../middlewares/auth');
const router = Router();


router.post('/:id/like', auth, likeSwitch)
router.get('/:id/like', auth, likeCount)

module.exports = router;