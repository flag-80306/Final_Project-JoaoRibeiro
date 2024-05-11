// function a fazer ->fazer login, register, change password, change email, change name, change city, change country
const authDB = require('../db/authAdminDB');
const argon2 = require('argon2');
const jwtService = require('../services/jwtService');

async function getAllAdminLogins(req, res) {
	const manager = await authDB.getManagerLonginsFromDatabase();
	console.log('manager');
	res.json(manager);
}
async function getManagerByID(req, res) {
	const manager = await authDB.getManagerByIDFromDatabase(req.params.id);
	res.json(manager);
}
async function postManagerRegister(req, res) {
	const { email, password, manager_name } = req.body;
	const hash = await argon2.hash(password);

	try {
		const result = await authDB.insertManagerToDatabase(email, hash, manager_name);

		if (result) {
			res.json({ status: 'success', message: 'User registered successfully' });
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

	const managerDB = await authDB.getManagerByEmail(email);
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

	const token = jwtService.createToken(managerDB.id, managerDB.email);
	res.json({
		status: 'Ok',
		message: 'Manager logged in succefully',
		token,
	});
}

module.exports = {
	getAllAdminLogins,
	getManagerByID,
	postManagerRegister,
	postManagerLogin,
};
