const {Router} = require ('express');
const { likeSwitch, likeCount } = require('../controllers/users_posts_likeController');
const router = Router();


router.post('/:id/like', likeSwitch)
router.get('/:id/like', likeCount)

module.exports = router;