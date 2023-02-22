const CHARACTERS = {};

const characterSelect = document.getElementById('characters');
const resultsEl = document.getElementById('results');

// Get character id from location.search string
const defaultCharacter = location.search.replace('?', '').split(';').reduce((_, param) => {
	const [key, val] = param.split('=');
	console.log(val);
	if (key === 'character') return val;
}, null);

// fetch the selected characters, and populate the page
const fetchCharacter = (name) => {
	const character = CHARACTERS[name];

	resultsEl.innerText = JSON.stringify(character);
};

// fetch all the characters, and populate the select element
const fetchAllCharacters = (pageN = 1) => {
	fetch(`https://swapi.dev/api/people/?page=${pageN}`, {
		method: 'GET',
		cache: 'force-cache',
	}).then(res => {
		if (res.status >= 400) throw new Error(res.status);
		return res.json();
	})
		.then(data => {
			if (pageN === 1) {
				characterSelect.innerHTML = '';
			}
			// add character option elements
			data.results.forEach(character => {
				const { url, name,  } = character;
				const option = document.createElement('option');
				const nameLower = name.replace(/\s/, '_').toLowerCase();
				option.value = nameLower;
				option.innerText = name;

				characterSelect.appendChild(option);
				CHARACTERS[nameLower] = character;
			});
			// check for more characters
			if (data.next) {
				fetchAllCharacters(pageN + 1);
			} else if (characterSelect.children.length !== data.count) {
				console.log('character count error');
			} else if (defaultCharacter) {
				fetchCharacter(defaultCharacter)
			}
		})
		.catch(console.error);
};

fetchAllCharacters();
