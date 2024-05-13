const baseDomain = 'http://localhost:3000';

async function getAllClients() {
	const url = `${baseDomain}/clients/`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}
async function getClientByID(client_id) {
	if (!client_id) {
		console.error('Client ID is undefined');
		return null;
	}
	const url = `${baseDomain}/clients/${client_id}`;
	const token = localStorage.getItem('token');
	const response = await fetch(url, {
		headers: { authorization: `Bearer ${token}` },
	});

	const result = response.json();

	return result;
}
async function postClientRegister(client_id) {
	// if (!client_id) {
	// 	console.error('Client ID is undefined');
	// 	return null;
	// }
	// const url = `${baseDomain}/bookings/client/${client_id}`;
	// const [response] = await fetch(url);
	// console.log(response);
	// const result = await response.json();
	// console.log(result);
	// return result;
}

async function postClientLogin(client_id) {
	// if (!client_id) {
	// 	console.error('Client ID is undefined');
	// 	return null;
	// }
	// const url = `${baseDomain}/bookings/client/${client_id}`;
	// const [response] = await fetch(url);
	// console.log(response);
	// const result = await response.json();
	// console.log(result);
	// return result;
}
export default {
	getAllClients,
	getClientByID,
	postClientRegister,
	postClientLogin,
};
