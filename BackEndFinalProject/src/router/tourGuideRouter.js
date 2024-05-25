const router = require('express').Router();
const appController = require('../controllers/tourGuideController');

router.get('/', appController.getAllTourGuide);
router.get('/:id', appController.getTourGuideByTourID);
router.post('/register', appController.postTourGuide);
router.put('/:tour_id/:guide_id', appController.editTourGuide);
router.delete('/:tour_id/:guide_id', appController.deleteTourGuide);

module.exports = router;
