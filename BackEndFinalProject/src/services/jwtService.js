const jwt = require('jsonwebtoken');
const tokenSecret = process.env.TOKEN_SECRET;

function createToken(userID, email) {
	const payload = {
		userID,
		email,
	};
	return jwt.sign(payload, tokenSecret, { expiresIn: '6h' });
}
function verifyToken(token) {
	try {
		var decoded = jwt.verify(token, tokenSecret);
		return decoded;
	} catch (error) {
		console.log('Invalid token');
	}
}
module.exports = {
	createToken,
	verifyToken,
};
