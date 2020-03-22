// -----------Global variables -----------
// Search bar
const searchBarBtn = document.querySelector(".search-bar__btn");
// Fetch
let cardContainer = document.querySelector(".card-container")

// -----------Functions -----------
// Resets display and content 
function reset() {
	cardContainer.style.visibility = "hidden";
	cardContainer.value = "";
}

// Fetch from Reddit API
function fetchSub(sub) {
	fetch(
			`https://api.pushshift.io/reddit/search/submission/?q=${sub}&size=8&is_video=true&subreddit=css&subreddit=WebdevTutorials&subreddit=web_design&subreddit=webdev`
		)
		.then(res => res.json())
		.then(res => {
			for (let i = 0; i < res.data.length; i++) {
				// Selects each array element from fetch result
				let selectResult = res.data[i];
				// Creates an empty element to store fetch result
				createCard();
				// Gave each card a numbered class
				cardContainer.children[i].classList.add(`card-${i}`);
				// Grabs elements
				let title = document.querySelector(`.card-${i} > .info__title`);
				let sub = document.querySelector(`.card-${i} > .info__sub`);
				let url = document.querySelector(`.card-${i} > .info__url`);
				let link = document.querySelector(`.card-${i} > .info__link`);

				// Grabs result and store it into the DOM
				let result = ({
					title: selectResult.title,
					sub: selectResult.subreddit,
					url: selectResult.url,
					link: selectResult.full_link
				});

				title.textContent = result.title;
				sub.textContent = result.sub;
				url.textContent = result.url;
				link.textContent = result.link;
			}

		})
		.catch(console.error);
}

// Creates card from template
function createCard() {
	let temp = document.querySelector(".card-template");
	let clone = temp.content.cloneNode(true);
	cardContainer.appendChild(clone);
}

// Search bar functionality 
function searchTheInput() {
	reset();
	cardContainer.style.visibility = "visible";
	let searchInput = document.querySelector("#search-bar__input");
	(searchInput.value === "") ? alert("Please input text"): fetchSub(searchInput.value);
}
searchBarBtn.addEventListener("click", searchTheInput);


// ----------- init -----------
reset();