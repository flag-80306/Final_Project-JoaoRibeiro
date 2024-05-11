const validator = require('validator');
const clientsDB = require('../db/clientsDB');

async function getAllClients(req, res) {
	const clients = await clientsDB.getClientsFromDatabase();
	console.log('clients');
	res.json(clients);
}

async function getClientByID(req, res) {
	const client = await clientsDB.getClientByIDFromDatabase(req.params.id);
	res.json(client);
}

async function getClientByEmail(req, res) {
	const client = await clientsDB.getClientByEmailFromDatabase(req.params.id);
	res.json(client);
}

async function addNewClient(req, res) {
	const { client_username, password, tin, client_name, email, city, country } = req.body;

	if (validator.isEmpty(client_username)) {
		res.status(400).json('Invalid Payload');
		return;
	}

	const client = {
		client_username,
		password,
		tin,
		client_name,
		email,
		city,
		country,
	};

	try {
		const result = await clientsDB.insertNewClientToDatabase(client);
		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).send('There was an error');
	}
}
async function postClientLogin(rq, res) {
	const { email, password } = req.body;

	const clientDB = await clientDB.getClientByEmail(email);
	if (!clientDB) {
		res.status(400).json({
			status: 'error',
			message: 'Manager not found',
		});
		return;
	}

	const hash = clientDB.password;

	const verified = await argon2.verify(hash, password);
	if (!verified) {
		res.status(400).json({
			status: 'error',
			message: 'Wrong password',
		});
		return;
	}

	// const token = jwtService.createToken(clientDB.client_id, managerDB.email);
	res.json({
		status: 'Ok',
		message: 'Manager logged in succefully',
		// token,
	});
}

async function editClient(req, res) {
	const id = req.params.id;
	const { client_username, password, tin, client_name, email, city, country } = req.body;

	if (!validator.isNumeric(id)) {
		res.status(400).json('Invalid Request');
		return;
	}

	if (validator.isEmpty(client_username)) {
		res.status(400).json('Invalid Payload');
		return;
	}

	const client = {
		client_username,
		password,
		tin,
		client_name,
		email,
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
	getClientByEmail,
	addNewClient,
	postClientLogin,
	editClient,
	deleteClient,
};
