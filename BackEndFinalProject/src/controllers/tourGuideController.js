const validator = require('validator');
const tourGuideDB = require('../db/tourGuideDB');

async function getAllTourGuide(req, res) {
	const tourGuide = await tourGuideDB.getTourGuideFromDatabase();
	res.json(tourGuide);
	console.log(tourGuide);
}

async function getTourGuideByTourID(req, res) {
	const tourGuide = await tourGuideDB.getTourGuideByTourIDFromDatabase(req.params.id);
	res.json(tourGuide);
}

async function addNewTourGuide(req, res) {
	const { tour_id, guide_id } = req.body;

	if (validator.isEmpty(tour_id)) {
		res.status(400).json('Invalid Payload');
		return;
	}

	const tour = {
		tour_id,
		guide_id,
	};

	try {
		const result = await tourGuideDB.insertNewTourGuideToDatabase(tour);
		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).send('There was an error');
	}
}

async function editTourGuide(req, res) {
	const { tour_id, guide_id } = req.params;
	const { newGuide_id } = req.body;

	if (!validator.isNumeric(tour_id) || !validator.isNumeric(guide_id)) {
		res.status(400).json('Invalid Request');
		return;
	}

	if (newGuide_id === undefined || !validator.isNumeric(newGuide_id)) {
		res.status(400).json('Invalid Payload');
		return;
	}

	try {
		const result = await tourGuideDB.updateTourGuideFromDatabase(newGuide_id, [tour_id, guide_id]);
		if (result[0].affectedRows === 0) {
			res.status(404).json('No relation found');
		} else {
			res.json({ message: 'Guide_id updated successfully' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).send('There was an error');
	}
}

async function deleteTourGuide(req, res) {
	const { tour_id, guide_id } = req.params;

	if (!validator.isNumeric(tour_id) || !validator.isNumeric(guide_id)) {
		res.status(400).json('Invalid Request');
		return;
	}
	try {
		const result = await tourGuideDB.deleteTourGuideFromDatabase(guide_id, tour_id);
		if (result[0].affectedRows === 0) {
			res.status(404).json('No relation found');
		} else {
			res.json({ message: 'Guide_id deleted successfully' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).send('There was an error');
	}
}
module.exports = {
	getAllTourGuide,
	getTourGuideByTourID,
	addNewTourGuide,
	editTourGuide,
	deleteTourGuide,
};
