const router = require('express').Router();
const appController = require('../controllers/rateController');

router.get('/', appController.getAllRates);
router.get('/:id', appController.getRateByID);

router.get('/tour/:id', appController.getRateByTourID);
router.get('/client/:id', appController.getRateByClientID);
router.get('/booking/:id', appController.getRateByBookingID);

router.post('/register', appController.postNewRate);

router.put('/:id', appController.editRate);

router.delete('/:id', appController.deleteRate);

module.exports = router;
