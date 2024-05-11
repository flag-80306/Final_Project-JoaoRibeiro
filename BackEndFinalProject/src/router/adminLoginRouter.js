const router = require('express').Router();
// const appController = require('../controllers/appController'); - apagar
const authController = require('../controllers/authAdminController');
const privateController = require('../controllers/privateController');

router.get('/', authController.getAllAdminLogins);
router.get('/:id', authController.getManagerByID);
router.post('/register', authController.postManagerRegister);
router.post('/login', authController.postManagerLogin);
// router.put('/:id', authController.editManager);
// router.delete('/:id', authController.deleteManager);

router.get('/private/notes', privateController.getNotes);

// router.delete('/:id', appController.deleteRegistration);

module.exports = router;
