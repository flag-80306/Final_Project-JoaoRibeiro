const router = require('express').Router();
const appController = require('../controllers/guideController');

router.get('/', appController.getAllGuides);
router.get('/:id', appController.getGuideByID);
router.post('/register', appController.addNewGuide);
router.put('/:id', appController.editGuide);
router.delete('/:id', appController.deleteGuide);

module.exports = router;
