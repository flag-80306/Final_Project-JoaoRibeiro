const validator = require('validator');
const reviewsDB = require('../db/reviewsDB');

async function getAllReviews(req, res) {
	const reviews = await reviewsDB.getReviewsFromDatabase();
	res.json(reviews);
}

async function getReviewByID(req, res) {
	const review = await reviewsDB.getReviewByIDFromDatabase(req.params.id);
	res.json(review);
}

async function addNewReview(req, res) {
	const { booking_id, comment, stars } = req.body;

	if (validator.isEmpty(booking_id)) {
		res.status(400).json('Invalid Payload');
		return;
	}

	const review = {
		booking_id,
		comment,
		stars,
	};

	try {
		const result = await reviewsDB.insertNewReviewToDatabase(review);
		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).send('There was an error');
	}
}

async function editReview(req, res) {
	const id = req.params.id;
	const { booking_id, comment, stars } = req.body;

	if (!validator.isNumeric(id)) {
		res.status(400).json('Invalid Request');
		return;
	}

	if (validator.isEmpty(booking_id)) {
		res.status(400).json('Invalid Payload');
		return;
	}

	const review = {
		booking_id,
		comment,
		stars,
	};

	try {
		const result = await reviewsDB.updateReviewFromDatabase(review, id);
		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).send('There was an error');
	}
}

async function deleteReview(req, res) {
	const id = req.params.id;
	try {
		const result = await reviewsDB.deleteReviewFromDatabase(id);
		res.json(result[0]);
	} catch (error) {
		console.log(error);
		res.status(500).send('There was an error');
	}
}
module.exports = {
	getAllReviews,
	getReviewByID,
	addNewReview,
	editReview,
	deleteReview,
};
