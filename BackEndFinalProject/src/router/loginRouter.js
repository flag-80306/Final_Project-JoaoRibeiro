const router = require('express').Router();
const appController = require('../controllers/appController');
const authController = require('../controllers/authController');
const privateController = require('../controllers/privateController');

router.get('/', appController.getRoot);

router.post('/register', authController.postManagerRegister);
router.post('/login', authController.postManagerLogin);

router.get('/private/notes', privateController.getNotes);

// router.delete('/:id', appController.deleteRegistration);

module.exports = router;
