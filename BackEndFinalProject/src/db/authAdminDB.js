const connection = require('./connectionDB');

async function getManagerFromDatabase() {
	const sql = 'SELECT * FROM admin_login';

	const response = await connection.promise().query(sql);

	const result = response[0];
	return result;
}
async function getManagerByIDFromDatabase(id) {
	const sql = 'SELECT * FROM admin_login WHERE manager_id = ?';

	const params = [id];

	const [result] = await connection.promise().query(sql, params);

	const client = result[0];

	return client;
}
async function insertManagerToDatabase(email, password, manager_name) {
	const sql = 'INSERT INTO admin_login VALUES (NULL, ?, ?, ?, NULL, NULL) ';
	const params = [email, password, manager_name];

	try {
		const [result] = await connection.promise().query(sql, params);
		return result.affectedRows > 0;
	} catch (error) {
		throw error;
	}
}

async function getManagerByEmailFromDatabase(email) {
	const sql = 'SELECT * FROM admin_login WHERE email = ?';
	const params = [email];

	const [result] = await connection.promise().query(sql, params);
	return result[0];
}

async function updateManagerFromDatabase(manager, id) {
	const sql = 'UPDATE admin_login SET email = ?, password = ?, manager_name = ? WHERE manager_id = ?';

	const params = [manager.email, manager.password, manager.manager_name, id];

	const response = await connection.promise().query(sql, params);

	return response;
}

async function deleteManagerFromDatabase(id) {
	if (id != 1) {
		const sql = 'DELETE FROM admin_login WHERE manager_id = ?';
		const response = await connection.promise().query(sql, id);
		return response;
	} else {
		throw new Error('You cannot delet manager_id = 1.');
	}
}

module.exports = {
	getManagerFromDatabase,
	insertManagerToDatabase,
	getManagerByIDFromDatabase,
	getManagerByEmailFromDatabase,
	updateManagerFromDatabase,
	deleteManagerFromDatabase,
};
