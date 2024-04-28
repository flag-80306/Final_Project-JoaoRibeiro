function getRoot(req, res) {
	const app = {
		status: 'Booked',
		description: 'city tour',
	};
	res.json(app);
}

module.exports = { getRoot };
