const validator = require('validator');
const favouriteTourDB = require('../db/favouriteTourDB');

async function getAllFavouriteClientTours(req, res) {
	const favTour = await favouriteTourDB.getFavouriteClientToursFromDatabase();
	res.json(favTour);
}

async function getFavouriteToursByclientID(req, res) {
	const tourGuide = await favouriteTourDB.getFavouriteTourByClientIDFromDatabase(req.params.id);
	res.json(tourGuide);
}

async function postNewFavouriteTour(req, res) {
	const { client_id, tour_id } = req.body;

	if (validator.isEmpty(client_id.toString())) {
		res.status(400).json('Invalid Payload');
		return;
	}

	const fav = {
		client_id,
		tour_id,
	};

	try {
		const result = await favouriteTourDB.insertNewFavouriteClientTourToDatabase(fav);
		res.json(result);
	} catch (error) {
		console.error('Error:', error);
		res.status(500).json({ status: 'error', message: error.message });
	}
}

async function editFavouriteTour(req, res) {
	const { client_id, tour_id } = req.params;
	const { newTour_id } = req.body;

	if (!validator.isNumeric(client_id) || !validator.isNumeric(tour_id)) {
		res.status(400).json('Invalid Request');
		return;
	}

	if (newTour_id === undefined || !validator.isNumeric(newTour_id)) {
		res.status(400).json('Invalid Payload');
		return;
	}

	try {
		const result = await favouriteTourDB.updateFavouriteClientTourFromDatabase(newTour_id, [client_id, tour_id]);
		if (result[0].affectedRows === 0) {
			res.status(404).json('No relation found');
		} else {
			res.json(result);
		}
	} catch (error) {
		console.log(error);
		res.status(500).send('There was an error');
	}
}

async function deleteFavouriteTour(req, res) {
	const { client_id, tour_id } = req.params;

	if (!validator.isNumeric(tour_id) || !validator.isNumeric(client_id)) {
		res.status(400).json('Invalid Request');
		return;
	}
	try {
		const result = await favouriteTourDB.deleteFavouriteClientTourFromDatabase(client_id, tour_id);
		if (result[0].affectedRows === 0) {
			res.status(404).json('No relation found');
		} else {
			res.json({ result, message: 'Favourite tour removed successfully' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).send('There was an error');
	}
}
module.exports = {
	getAllFavouriteClientTours,
	getFavouriteToursByclientID,
	postNewFavouriteTour,
	editFavouriteTour,
	deleteFavouriteTour,
};
