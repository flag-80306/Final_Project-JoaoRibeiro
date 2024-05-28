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
	tours.tour_id = ?`;

	const params = [id];

	const response = await connection.promise().query(sql, params);
	const result = response[0];
	console.log('res', result);
	return result;
}

async function getTourGuideUsindIDsFromDatabase(tour_id, guide_id) {
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
	tours_guides.tour_id = ? AND tours_guides.guide_id = ?`;

	const params = [tour_id, guide_id];

	const response = await connection.promise().query(sql, params);
	const result = response[0];
	console.log('res', result);
	return result;
}

async function insertNewTourGuideToDatabase(tourGuide) {
	const sql = 'INSERT INTO tours_guides VALUES (?, ?) ';
	const tourID = tourGuide.tour_id;
	const guideID = tourGuide.guide_id;
	console.log('tourID', tourID);
	console.log('guideID', tourID);

	const verifyTourGuide = await getTourGuideUsindIDsFromDatabase(tourID, guideID);
	if (verifyTourGuide.length > 0) {
		throw new Error(`${guideID} guide is already in${tourID} TourID!`);
	}

	try {
		const result = await connection.promise().query(sql, [tourID, guideID]);
		console.log('res2', result);
		const [newTourGuide] = await getTourGuideUsindIDsFromDatabase(tourID, guideID);
		console.log('newTourGuide', newTourGuide);
		return newTourGuide;
	} catch (error) {
		console.error('Error inserting new tour guide:', error);
		throw error;
	}
}

async function updateTourGuideFromDatabase(newGuide_id, [tour_id, guide_id]) {
	if (guide_id != 4) {
		const sql = 'UPDATE tours_guides SET guide_id = ? WHERE tour_id = ? AND guide_id = ?';
		const params = [newGuide_id, tour_id, guide_id];
		// console.log('params', params);
		const response = await connection.promise().query(sql, params);
		// console.log('response', response);
		return response;
	} else {
		throw new Error('You cannot update guide_id = 4!!!');
	}
}

async function deleteTourGuideFromDatabase(guide_id, tour_id) {
	if (guide_id != 4) {
		const sql = 'DELETE FROM tours_guides WHERE guide_id = ? AND tour_id = ?';

		const response = await connection.promise().query(sql, [guide_id, tour_id]);

		return response;
	} else {
		throw new Error('You cannot delete guide_id = 4!!!');
	}
}

module.exports = {
	getTourGuideFromDatabase,
	getTourGuideByTourIDFromDatabase,
	insertNewTourGuideToDatabase,
	updateTourGuideFromDatabase,
	deleteTourGuideFromDatabase,
};
