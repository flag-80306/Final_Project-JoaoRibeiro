const validator = require('validator');
const ratesDB = require('../db/ratesDB');

async function getAllRates(req, res) {
	const reviews = await ratesDB.getRateFromDatabase();
	res.json(reviews);
}
async function getRateByID(req, res) {
	const review = await ratesDB.getRateByIDFromDatabase(req.params.id);
	res.json(review);
}
// getAllRateLO e getRateCount nao definidos
async function getRateByTourID(req, res) {
	const review = await reviewsDB.getAllToursIDRateFromDatabase(req.params.id);
	res.json(review);
}
async function getRateByClientID(req, res) {
	const review = await ratesDB.getAllClientIDRateFromDatabase(req.params.id);
	res.json(review);
}

async function getRateByBookingID(req, res) {
	const review = await ratesDB.getBookingIDRateFromDatabase(req.params.id);
	res.json(review);
}

async function postNewRate(req, res) {
	const { tour_id, client_id, rate, booking_id } = req.body;

	if (validator.isEmpty(tour_id.toString())) {
		res.status(400).json('Invalid Payload');
		return;
	}

	const rating = {
		tour_id,
		client_id,
		rate,
		booking_id,
	};

	try {
		const result = await ratesDB.insertNewRateToDatabase(rating);
		res.json(result);
		console.log('rate', result);
	} catch (error) {
		console.log(error);
		res.status(500).json({ status: 'error', message: error.message });
	}
}

async function editRate(req, res) {
	const id = req.params.id;
	const { tour_id, client_id, rate, booking_id } = req.body;

	if (!validator.isNumeric(id)) {
		res.status(400).json('Invalid Request');
		return;
	}

	if (validator.isEmpty(tour_id)) {
		res.status(400).json('Invalid Payload');
		return;
	}

	const rating = {
		tour_id,
		client_id,
		rate,
		booking_id,
	};

	try {
		const result = await ratesDB.updateRateFromDatabase(rating, id);
		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).send('There was an error');
	}
}

async function deleteRate(req, res) {
	const id = req.params.id;
	try {
		const result = await ratesDB.deleteRateFromDatabase(id);
		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).send('There was an error');
	}
}
module.exports = {
	getAllRates,
	getRateByID,
	getRateByClientID,
	getRateByTourID,
	getRateByBookingID,
	postNewRate,
	editRate,
	deleteRate,
};
