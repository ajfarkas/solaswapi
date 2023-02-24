const $id = id => document.getElementById(id);
const characterEl = $id('character');

// Get character id from location.search string
const defaultCharacter = location.search.replace('?', '').split(';').reduce((_, param) => {
	const [key, val] = param.split('=');
	if (key === 'id' || key === 'name') return val;
}, null);

renderAttributes = data => {
	[
		'name',
		'birth_year',
		'height',
		'mass',
		'hair_color',
		'eye_color',
		'skin_color'
	].forEach(attr => {
		$id(attr).innerText = data[attr];
	});
	fetch(data.homeworld, {
		method: 'GET',
		cache: 'force-cache',
	}).then(res => {
		if (res.status >= 400) throw new Error(res.status);
		return res.json();
	}).then(homeData => {
		$id('homeworld').innerText = homeData.name;
	})
}

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
			renderAttributes(charInfo);
		})
		.catch(console.error);
};

fetchCharacter(defaultCharacter);
