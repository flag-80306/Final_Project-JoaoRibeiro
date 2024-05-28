const router = require('express').Router();
const appController = require('../controllers/favouriteTourController');

router.get('/', appController.getAllFavouriteClientTours);
router.get('/:id', appController.getFavouriteToursByclientID);
router.get('/:client_id/:tour_id', appController.getFavToursWithClientAndTourID);
router.post('/register', appController.postNewFavouriteTour);
router.put('/:client_id/:tour_id', appController.editFavouriteTour);
router.delete('/:client_id/:tour_id', appController.deleteFavouriteTour);

module.exports = router;
