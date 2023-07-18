const router = require('express').Router();
const { validateUpdateUser } = require('../middlewares/validatiors');
const { updateUser, getMyPage } = require('../controllers/users');

router.get('/me', getMyPage);
router.patch('/me', validateUpdateUser, updateUser);

module.exports = router;
