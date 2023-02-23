const characterEl = document.getElementById('character');

// Get character id from location.search string
const defaultCharacter = location.search.replace('?', '').split(';').reduce((_, param) => {
	const [key, val] = param.split('=');
	if (key === 'id' || key === 'name') return val;
}, null);

// fetch the selected character, and populate the page
const fetchCharacter = (charVal) => {
	const urlParam = isNaN(parseInt(charVal))
		? `?search=${charVal.replace('_', ' ')}`
		: `${charVal}/`;

	fetch(`https://swapi.dev/api/people/${urlParam}`, {
		method: 'GET',
		cache: 'force-cache',
	}).then(res => {
		if (res.status >= 400) throw new Error(res.status);
		return res.json();
	})
		.then(data => {
			const charInfo = Array.isArray(data)
				? data.results[0]
				: data;
			characterEl.innerText = JSON.stringify(charInfo);
		})
		.catch(console.error);
};

fetchCharacter(defaultCharacter);
