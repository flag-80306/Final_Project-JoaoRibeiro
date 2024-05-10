// function a fazer ->fazer login, register, change password, change email, change name, change city, change country
const authDB = require('../db/authDB');
const argon2 = require('argon2');

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
	res.json('Manager logged in!');
}

module.exports = {
	postManagerRegister,
	postManagerLogin,
};
