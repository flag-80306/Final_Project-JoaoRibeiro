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

function getTourByID(req, res) {
	const app = {
		status: 'Booked',
		description: 'city tour',
	};
	res.json(app);
}

function addNewTour(req, res) {
	const app = {
		status: 'Booked',
		description: 'city tour',
	};
	res.json(app);
}

function editTour(req, res) {
	const app = {
		status: 'Booked',
		description: 'city tour',
	};
	res.json(app);
}

function deleteTour(req, res) {
	const app = {
		status: 'Booked',
		description: 'city tour',
	};
	res.json(app);
}
module.exports = {
	getRoot,
	getAllTours,
	getTourByID,
	addNewTour,
	editTour,
	deleteTour,
};
