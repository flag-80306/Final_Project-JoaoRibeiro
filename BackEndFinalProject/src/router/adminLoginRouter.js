const router = require('express').Router();

const authController = require('../controllers/authAdminController');

router.get('/', authController.getAllAdmin);
router.get('/:id', authController.getManagerByID);
router.post('/register', authController.postNewManager);
router.post('/login', authController.postManagerLogin);
router.put('/:id', authController.editManager);
router.delete('/:id', authController.deleteManager);

module.exports = router;
