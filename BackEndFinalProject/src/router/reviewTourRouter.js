const router = require('express').Router();
const appController = require('../controllers/reviewController');

router.post('/review/register', appController.postNewReview);
router.get('/reviews', appController.getAllReviews);
router.get('/reviews/:id', appController.getAllReviewsFromToursID);

module.exports = router;
