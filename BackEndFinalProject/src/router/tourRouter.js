const router = require('express').Router();
const appController = require('../controllers/tourController');

router.get('/', appController.getAllTours);
router.get('/:id', appController.getTourByID);
router.post('/register', appController.postNewTour);
router.put('/:id', appController.editTour);
router.delete('/:id', appController.deleteTour);

module.exports = router;
