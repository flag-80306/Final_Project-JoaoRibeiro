const connection = require('./connectionDB');

async function getGuidesFromDatabase() {
	const sql = 'SELECT * FROM guides';

	const response = await connection.promise().query(sql);

	const result = response[0];
	return result;
}

async function getGuideByIDFromDatabase(id) {
	const sql = 'SELECT * FROM guides WHERE guide_id = ?';

	const params = [id];

	const response = await connection.promise().query(sql, params);
	const result = response[0];
	const guide = result[0];
	return guide;
}

async function insertNewGuideToDatabase(guide) {
	const sql = 'INSERT INTO guides VALUES (NULL, ?, ?, ?, NULL, NULL) ';
	const params = [guide.guide_name, guide.description, guide.picture];

	const [result] = await connection.promise().query(sql, params);
	// console.log(result);
	const newGuide = getGuideByIDFromDatabase(result.insertId);
	return newGuide;
}

async function updateGuideFromDatabase(guide, id) {
	const sql = 'UPDATE guides SET guide_name = ?, description = ?, picture = ? WHERE guide_id = ?';

	const params = [guide.guide_name, guide.description, guide.picture, id];

	const response = await connection.promise().query(sql, params);

	return response;
}

async function deleteGuideFromDatabase(id) {
	const deleteGuideSql = 'DELETE FROM guides WHERE guide_id = ?';
	const deleteToursGuideSql = 'DELETE FROM tours_guides WHERE guide_id = ?';
	const deletebookingTourSql = 'DELETE FROM bookings WHERE guide_id = ?';

	await connection.promise().query('START TRANSACTION');

	try {
		await connection.promise().query(deleteToursGuideSql, [id]);
		await connection.promise().query(deletebookingTourSql, [id]);

		const [result] = await connection.promise().query(deleteGuideSql, [id]);

		await connection.promise().query('COMMIT');

		return result;
	} catch (error) {
		await connection.promise().query('ROLLBACK');
		throw error;
	}
}

module.exports = {
	getGuidesFromDatabase,
	getGuideByIDFromDatabase,
	insertNewGuideToDatabase,
	updateGuideFromDatabase,
	deleteGuideFromDatabase,
};
