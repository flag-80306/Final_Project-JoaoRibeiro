const router = require('express').Router();
// const appController = require('../controllers/appController'); - apagar este e ficheiro original
const authController = require('../controllers/authAdminController');
const privateController = require('../controllers/privateController');

router.get('/', authController.getAllAdmin);
router.get('/:id', authController.getManagerByID);
router.post('/register', authController.postNewManager);
router.post('/login', authController.postManagerLogin);
router.put('/:id', authController.editManager);
router.delete('/:id', authController.deleteManager);

router.get('/private/notes', privateController.getNotes);

module.exports = router;
