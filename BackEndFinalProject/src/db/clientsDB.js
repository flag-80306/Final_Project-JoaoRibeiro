const connection = require('./connectionDB');

async function getClientsFromDatabase() {
	const sql = 'SELECT * FROM clients';

	const response = await connection.promise().query(sql);

	const result = response[0];
	return result;
}

async function getClientByIDFromDatabase(id) {
	const sql = 'SELECT * FROM clients WHERE client_id = ?';

	const params = [id];

	const response = await connection.promise().query(sql, params);
	const result = response[0];
	const client = result[0];

	return client;
}

async function insertNewClientToDatabase(client) {
	const sql = 'INSERT INTO clients VALUES (NULL, ?, ?, ?, ?, ?, ?, NULL, NULL) ';
	const params = [client.email, client.password, client.tin, client.client_name, client.city, client.country];

	try {
		const [result] = await connection.promise().query(sql, params);
		return result.affectedRows > 0;
	} catch (error) {
		throw error;
	}
}

async function getClientByEmailFromDatabase(email) {
	const sql = 'SELECT * FROM clients WHERE email = ?';

	const params = [email];

	const [response] = await connection.promise().query(sql, params);
	const result = response[0];

	return result;
}

async function updateClientFromDatabase(client, id) {
	const sql = 'UPDATE clients SET email = ?, tin = ?, client_name = ?, city = ?, country = ? WHERE client_id = ?';

	const params = [client.email, client.tin, client.client_name, client.city, client.country, id];
	try {
		const [results] = await connection.promise().query(sql, params);

		// console.log(results);
		return results.affectedRows > 0;
	} catch (error) {
		throw error;
	}
}

async function UpdatePasswordInDatabase(client, id) {
	const sql = 'UPDATE clients SET password = ? WHERE client_id = ?';

	const params = [client.password, id];

	try {
		const [results] = await connection.promise().query(sql, params);
		// console.log(results);
		return results.affectedRows > 0;
	} catch (error) {
		throw error;
	}
}

async function deleteClientFromDatabase(id) {
	const sql = 'DELETE FROM clients WHERE client_id = ?';

	const response = await connection.promise().query(sql, id);

	return response;
}

module.exports = {
	getClientsFromDatabase,
	getClientByIDFromDatabase,
	getClientByEmailFromDatabase,
	insertNewClientToDatabase,
	UpdatePasswordInDatabase,
	updateClientFromDatabase,
	deleteClientFromDatabase,
};
