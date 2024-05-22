const connection = require('./connectionDB');

async function getTourGuideFromDatabase() {
	const sql = `SELECT
	tours_guides.*,tours.tour_name, guides.guide_name
	FROM
	tours_guides
	INNER JOIN
	tours
	ON
	tours_guides.tour_id = tours.tour_id
	INNER JOIN
	guides
	ON
	guides.guide_id = tours_guides.guide_id;`;

	const response = await connection.promise().query(sql);

	const result = response[0];
	return result;
}

async function getTourGuideByTourIDFromDatabase(id) {
	// const sql = `SELECT
	// tours_guides.*,tours.tour_name,
	// GROUP_CONCAT(guides.guide_name SEPARATOR ', ') AS guides_names
	// FROM
	// tours_guides
	// INNER JOIN
	// tours
	// ON
	// tours_guides.tour_id = tours.tour_id
	// INNER JOIN
	// guides
	// ON
	// guides.guide_id = tours_guides.guide_id
	// WHERE
	// tours.tour_id = ?
	// GROUP BY
	// tours.tour_name`;
	const sql = `SELECT
	tours_guides.*,tours.tour_name, guides.guide_name
	FROM
	tours_guides
	INNER JOIN
	tours
	ON
	tours_guides.tour_id = tours.tour_id
	INNER JOIN
	guides
	ON
	guides.guide_id = tours_guides.guide_id
	WHERE
	tours.tour_id = ?
	GROUP BY
	tours.tour_name`;

	const params = [id];

	const response = await connection.promise().query(sql, params);
	const result = response[0];

	return result;
}

async function insertNewTourGuideToDatabase(tourGuide) {
	const sql = 'INSERT INTO tours_guides VALUES (?, ?) ';
	const params = [tourGuide.tour_id, tourGuide.guide_id];

	const response = await connection.promise().query(sql, params);

	return response;
}

async function updateTourGuideFromDatabase(newGuide_id, [tour_id, guide_id]) {
	const sql = 'UPDATE tours_guides SET guide_id = ? WHERE tour_id = ? AND guide_id = ?';

	const params = [newGuide_id, tour_id, guide_id];
	console.log('params', params);
	const response = await connection.promise().query(sql, params);
	console.log('response', response);
	return response;
}

async function deleteTourGuideFromDatabase(guide_id, tour_id) {
	const sql = 'DELETE FROM tours_guides WHERE guide_id = ? AND tour_id = ?';

	const response = await connection.promise().query(sql, [guide_id, tour_id]);

	return response;
}

module.exports = {
	getTourGuideFromDatabase,
	getTourGuideByTourIDFromDatabase,
	insertNewTourGuideToDatabase,
	updateTourGuideFromDatabase,
	deleteTourGuideFromDatabase,
};
