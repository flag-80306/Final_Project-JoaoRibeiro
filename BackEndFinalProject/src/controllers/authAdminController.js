const validator = require('validator');
const authDB = require('../db/authAdminDB');
const argon2 = require('argon2');
const jwtService = require('../services/jwtService');

async function getAllAdmin(req, res) {
	const manager = await authDB.getManagerFromDatabase();

	res.json(manager);
}

async function getManagerByID(req, res) {
	const manager = await authDB.getManagerByIDFromDatabase(req.params.id);
	res.json(manager);
}

async function postNewManager(req, res) {
	const { email, password, manager_name } = req.body;
	const hash = await argon2.hash(password);

	try {
		const result = await authDB.insertManagerToDatabase(email, hash, manager_name);

		if (result) {
			res.json(result);
		} else {
			throw new Error('Error inserting user into database');
		}
	} catch (error) {
		console.error('Error:', error);
		res.status(500).json({ status: 'error', message: error.message });
	}
}

async function postManagerLogin(req, res) {
	const { email, password } = req.body;

	const managerDB = await authDB.getManagerByEmailFromDatabase(email);
	if (!managerDB) {
		res.status(400).json({
			status: 'error',
			message: 'Manager not found',
		});
		return;
	}

	const hash = managerDB.password;

	const verified = await argon2.verify(hash, password);

	if (!verified) {
		res.status(400).json({
			status: 'error',
			message: 'Wrong password',
		});
		return;
	}

	const token = jwtService.createToken(managerDB.manager_id, managerDB.email);
	res.json({
		status: 'Ok',
		message: 'Manager logged in succefully',
		token,
	});
}
async function editManager(req, res) {
	const id = req.params.id;
	const { email, password, manager_name } = req.body;
	const hash = await argon2.hash(password);

	if (!validator.isNumeric(id)) {
		res.status(400).json('Invalid Request');
		return;
	}

	if (validator.isEmpty(email)) {
		res.status(400).json('Invalid Payload');
		return;
	}

	const manager = {
		email,
		password: hash,
		manager_name,
	};

	try {
		const result = await authDB.updateManagerFromDatabase(manager, id);
		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).send('There was an error');
	}
}

async function deleteManager(req, res) {
	const id = req.params.id;
	try {
		const result = await authDB.deleteManagerFromDatabase(id);
		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).send('There was an error');
	}
}

module.exports = {
	getAllAdmin,
	getManagerByID,
	postNewManager,
	postManagerLogin,
	editManager,
	deleteManager,
};
