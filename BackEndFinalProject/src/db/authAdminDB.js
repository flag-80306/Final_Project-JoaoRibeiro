const connection = require('./connectionDB');

async function getManagerLonginsFromDatabase() {
	const sql = 'SELECT * FROM admin_login';

	const response = await connection.promise().query(sql);

	const result = response[0];
	return result;
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
async function getManagerByIDFromDatabase(id) {
	const sql = 'SELECT * FROM admin_login WHERE manager_id = ?';

	const params = [id];

	const [result] = await connection.promise().query(sql, params);

	const client = result[0];

	return result;
}
async function getManagerByEmailFromDatabase(email) {
	const sql = 'SELECT * FROM admin_login WHERE email = ?';
	const params = [email];

	const [result] = await connection.promise().query(sql, params);
	return result[0];
}

module.exports = {
	getManagerLonginsFromDatabase,
	insertManagerToDatabase,
	getManagerByIDFromDatabase,
	getManagerByEmailFromDatabase,
};
