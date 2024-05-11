const jwt = require('jsonwebtoken');
const tokenSecret = process.env.TOKEN_SECRET;

function createToken(userID, email) {
	const payload = {
		userID,
		email,
	};
	return jwt.sign(payload, tokenSecret);
}
function verifyToken(token) {
	var decoded = jwt.verify(token, tokenSecret);
	console.log(decoded);
}
module.exports = {
	createToken,
	verifyToken,
};
