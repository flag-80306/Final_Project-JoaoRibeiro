const validator = require('validator');
const toursDB = require('../db/toursDB');

async function getAllTours(req, res) {
	const limit = parseInt(req.query.limit) || 3;
	const offset = parseInt(req.query.offset) || 0;
	try {
		const tours = await toursDB.getToursFromDatabase(limit, offset);
		res.json(tours);
	} catch (error) {
		console.error('Error fetching tours: ', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
}

async function getTourByID(req, res) {
	const tour = await toursDB.getTourByIDFromDatabase(req.params.id);
	res.json(tour);
}

async function postNewTour(req, res) {
	const { tour_name, location, description, duration, price_person, images } = req.body;

	if (validator.isEmpty(tour_name)) {
		res.status(400).json('Invalid Payload');
		return;
	}

	const tour = {
		tour_name,
		location,
		description,
		duration,
		price_person,
		images,
	};

	try {
		const result = await toursDB.insertNewTourToDatabase(tour);
		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).send('There was an error');
	}
}

async function editTour(req, res) {
	const id = req.params.id;
	const { tour_name, location, description, duration, price_person, images } = req.body;

	if (!validator.isNumeric(id)) {
		res.status(400).json('Invalid Request');
		return;
	}

	if (validator.isEmpty(tour_name)) {
		res.status(400).json('Invalid Payload');
		return;
	}

	const tour = {
		tour_name,
		location,
		description,
		duration,
		price_person,
		images,
	};

	try {
		const result = await toursDB.updateTourFromDatabase(tour, id);
		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).send('There was an error');
	}
}

async function deleteTour(req, res) {
	const id = req.params.id;
	try {
		const result = await toursDB.deleteTourFromDatabase(id);
		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).send('There was an error');
	}
}
module.exports = {
	getAllTours,
	getTourByID,
	postNewTour,
	editTour,
	deleteTour,
};
