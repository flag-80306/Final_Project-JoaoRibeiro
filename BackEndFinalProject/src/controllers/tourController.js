const validator = require('validator');
const toursDB = require('../db/tours');

function getRoot(req, res) {
	const app = {
		status: 'Booked',
		description: 'city tour',
	};
	res.json(app);
}

async function getAllTours(req, res) {
	const tours = await toursDB.getToursFromDatabase();
	res.json(tours);
}

async function getTourByID(req, res) {
	const tour = await toursDB.getTourByIDFromDatabase(req.params.id);
	res.json(tour);
}

async function addNewTour(req, res) {
	const { name, location, latitude, longitude, description, duration, price_person, guide_id, images } = req.body;

	if (validator.isEmpty(name)) {
		res.status(400).json('Invalid Payload');
		return;
	}

	const tour = {
		name,
		location,
		latitude,
		longitude,
		description,
		duration,
		price_person,
		guide_id,
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
	const { name, location, latitude, longitude, description, duration, price_person, guide_id, images } = req.body;

	if (!validator.isNumeric(id)) {
		res.status(400).json('Invalid Request');
		return;
	}

	if (validator.isEmpty(name)) {
		res.status(400).json('Invalid Payload');
		return;
	}

	const tour = {
		name,
		location,
		latitude,
		longitude,
		description,
		duration,
		price_person,
		guide_id,
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
	} catch (error) {
		console.log(error);
		res.status(500).send('There was an error');
	}
}
module.exports = {
	getRoot,
	getAllTours,
	getTourByID,
	addNewTour,
	editTour,
	deleteTour,
};
