const baseDomain = 'http://localhost:3000';

async function getAllGuides() {
	const url = `${baseDomain}/guides/`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}

export default {
	getAllGuides,
};
