const connection = require('../db/connection');

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
async function getManagerByEmail(email) {
	const sql = 'SELECT * FROM admin_login WHERE email = ?';
	const params = [email];

	const [result] = await connection.promise().query(sql, params);
	return result[0];
}

module.exports = {
	insertManagerToDatabase,
	getManagerByEmail,
};
