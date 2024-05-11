const validator = require('validator');
const guidesDB = require('../db/guidesDB');

async function getAllGuides(req, res) {
	const guides = await guidesDB.getGuidesFromDatabase();
	res.json(guides);
}

async function getGuideByID(req, res) {
	const guide = await guidesDB.getGuideByIDFromDatabase(req.params.id);
	res.json(guide);
}

async function addNewGuide(req, res) {
	const { guide_name, description, picture } = req.body;

	if (validator.isEmpty(guide_name)) {
		res.status(400).json('Invalid Payload');
		return;
	}

	const guide = {
		guide_name,
		description,
		picture,
	};

	try {
		const result = await guidesDB.insertNewGuideToDatabase(guide);
		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).send('There was an error');
	}
}

async function editGuide(req, res) {
	const id = req.params.id;
	const { guide_name, description, picture } = req.body;

	if (!validator.isNumeric(id)) {
		res.status(400).json('Invalid Request');
		return;
	}

	if (validator.isEmpty(guide_name)) {
		res.status(400).json('Invalid Payload');
		return;
	}

	const guide = {
		guide_name,
		description,
		picture,
	};

	try {
		const result = await guidesDB.updateGuideFromDatabase(guide, id);
		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).send('There was an error');
	}
}

async function deleteGuide(req, res) {
	const id = req.params.id;
	try {
		const result = await guidesDB.deleteGuideFromDatabase(id);

		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).send('There was an error');
	}
}
module.exports = {
	getAllGuides,
	getGuideByID,
	addNewGuide,
	editGuide,
	deleteGuide,
};
