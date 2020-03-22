// -----------Global variables -----------
// Search bar
const searchBarBtn = document.querySelector(".search-bar__btn");
// Fetch car results
let cardContainer = document.querySelector(".card-container")

// -----------Functions -----------
// Resets display and content 
function reset() {
	cardContainer.style.display = "none";
	cardContainer.value = "";
}

// Fetch from Reddit API
function fetchSub(sub) {
	fetch(
			`https://api.pushshift.io/reddit/search/submission/?q=${sub}&is_video=true&subreddit=css&subreddit=WebdevTutorials&subreddit=web_design&subreddit=webdev`
		)
		.then(res => res.json())
		.then(res => {
			let selectResult = res.data[0];
			displayInfo({
				title: selectResult.title,
				sub: selectResult.subreddit,
				url: selectResult.url,
				link: selectResult.full_link
			});
		})
		.catch(console.error);
}

// Displays information into the DOM
function displayInfo(object) {
	createCard();
	const title = document.querySelector(".info__title");
	const sub = document.querySelector(".info__sub");
	const url = document.querySelector(".info__url");
	const link = document.querySelector(".info__link");

	title.textContent = object.title;
	sub.textContent = object.sub;
	url.textContent = object.url;
	link.textContent = object.link;
}

// Creates card form template
function createCard() {
	let temp = document.querySelector(".card-template");
	let clone = temp.content.cloneNode(true);
	cardContainer.appendChild(clone);
}

// Search bar functionality 
function searchTheInput() {
	reset();
	cardContainer.style.display = "block";
	let searchInput = document.querySelector("#search-bar__input");
	(searchInput.value === "") ? alert("Please input text"): fetchSub(searchInput.value);
}
searchBarBtn.addEventListener("click", searchTheInput);


// ----------- init -----------
reset();