const validator = require('validator');
const clientsDB = require('../db/clientsDB');
const argon2 = require('argon2');
const jwtService = require('../services/jwtService');

async function getAllClients(req, res) {
	const clients = await clientsDB.getClientsFromDatabase();
	console.log('clients');
	res.json(clients);
}

async function getClientByID(req, res) {
	const client = await clientsDB.getClientByIDFromDatabase(req.params.id);
	res.json(client);
}

async function postNewClient(req, res) {
	const { email, password, tin, client_name, city, country } = req.body;
	const hash = await argon2.hash(password);
	const client = { email, password: hash, tin, client_name, city, country };

	try {
		const result = await clientsDB.insertNewClientToDatabase(client);
		if (result) {
			res.json({ result, status: 'success', message: 'User registered successfully' });
		} else {
			throw new Error('Error inserting user into database');
		}
	} catch (error) {
		console.error('Error:', error);
		res.status(500).json({ status: 'error', message: error.message });
	}
}
async function postClientLogin(req, res) {
	const { email, password } = req.body;

	const clientLogin = await clientsDB.getClientByEmailFromDatabase(email);
	if (!clientLogin) {
		res.status(400).json({
			status: 'error',
			message: 'Client not found',
		});
		return;
	}

	const hash = clientLogin.password;

	const verified = await argon2.verify(hash, password);

	if (!verified) {
		res.status(400).json({
			status: 'error',
			message: 'Wrong password',
		});
		return;
	}

	const token = jwtService.createToken(clientLogin.client_id, clientLogin.email);
	console.log(token);
	res.json({
		status: 'Ok',
		message: 'Client logged in succefully',
		token,
	});
}

async function editClient(req, res) {
	const id = req.params.id;
	const { email, password, tin, client_name, city, country } = req.body;
	const hash = await argon2.hash(password);

	if (!validator.isNumeric(id)) {
		res.status(400).json('Invalid Request');
		return;
	}

	if (validator.isEmpty(email)) {
		res.status(400).json('Invalid Payload');
		return;
	}

	const client = {
		email,
		password: hash,
		tin,
		client_name,
		city,
		country,
	};

	try {
		const result = await clientsDB.updateClientFromDatabase(client, id);
		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).send('There was an error');
	}
}

async function deleteClient(req, res) {
	const id = req.params.id;
	try {
		const result = await clientsDB.deleteClientFromDatabase(id);

		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).send('There was an error');
	}
}
module.exports = {
	getAllClients,
	getClientByID,
	postNewClient,
	postClientLogin,
	editClient,
	deleteClient,
};
