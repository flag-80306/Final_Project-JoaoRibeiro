const mysql = require('mysql2');

const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DE_PASSWORD,
	database: process.env.DB_DATABASE,
});

async function getToursFromDatabase() {
	const query = 'SELECT * FROM tours';

	const response = await connection.promise().query(query);

	const result = response[0];
	return result;
}

module.exports = {
	getToursFromDatabase,
};
