const $ = selector => document.querySelector(selector);
const charsEl = document.getElementById('characters');

const sortByAlpha = arr => arr.sort((a, b) => a.name < b.name ? -1 : 1);

const renderAllCharacters = (allCharacters = []) => {
	// add character anchor elements
	sortByAlpha(allCharacters).forEach(character => {
		const { url, name } = character;
		const anchor = document.createElement('a');
		const id = url.match(/people\/(\d+)/)[1]
		anchor.setAttribute('href', `./character?id=${id}`);
		anchor.innerText = name;
		anchor.classList.add('char-link');

		charsEl.appendChild(anchor);
	});

	// set height/margin on scroll to properly display
	const titleHeight = parseInt(getComputedStyle($('.title')).height);
	const subtitleHeight = parseInt(getComputedStyle($('h2')).height);
	$('.char-container').style.height = `calc(100vh - ${titleHeight + subtitleHeight}px)`;
	$(':root').style.setProperty(
		'--scroll-margin',
		`calc(100vh - ${titleHeight + subtitleHeight}px - 2ex)`
	);
};

// fetch all the characters, and populate the select element
const fetchAllCharacters = (pageN = 1, knownChars = []) => {
	const allCharacters = knownChars;

	fetch(`https://swapi.dev/api/people/?page=${pageN}`, {
		method: 'GET',
		cache: 'force-cache',
	}).then(res => {
		if (res.status >= 400) throw new Error(res.status);
		return res.json();
	})
		.then(data => {
			if (pageN === 1) {
				charsEl.innerHTML = '';
			}

			allCharacters.push(...data.results);

			// check for more characters
			if (data.next) {
				fetchAllCharacters(pageN + 1, allCharacters);
			} else if (allCharacters.length !== data.count) {
				console.log('character count error', allCharacters.length, data.count, allCharacters);
			} else {
				renderAllCharacters(allCharacters);
			}
		})
		.catch(console.error);
};

fetchAllCharacters();
