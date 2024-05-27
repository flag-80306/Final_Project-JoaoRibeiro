const baseDomain = import.meta.env.VITE_BASE_DOMAIN;

async function getAllGuides() {
	const url = `${baseDomain}/guides/`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}

export default {
	getAllGuides,
};
