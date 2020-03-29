// -----------Global variables -----------
// Search bar
let searchInput = document.querySelector("#search-bar__input");
const searchBarBtn = document.querySelector(".search-bar__btn");
// Subreddits to fetch from 
const subFilter = "subreddit=WebdevTutorials&subreddit=web_design&subreddit=webdev&subreddit=Frontend&subreddit=css&subreddit=AskProgramming&subreddit=programming&subreddit=learnprogramming&subreddit=Coding&subreddit=JavaScript&subreddit=LearnJavaScript=&subreddit=PHP&subreddit=Learnwebdev";
// Fetch
let cardContainer = document.querySelector(".card-container");
// loading 
let loader = document.querySelector(".loader");

// -----------Functions -----------
// Resets display and content 
function reset() {
	cardContainer.style.visibility = "hidden";
	cardContainer.value = "";
	loader.style.display = "none";
}

// Fetch from Reddit API
function fetchSub(sub) {
	fetch(
			`https://api.pushshift.io/reddit/search/submission/?q=${sub}&domain=youtube.com&size=14&${subFilter}`
		)
		// Response changed to JSON format 
		.then(res => res.json())
		// Fetch result 
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
				let url = document.querySelector(`.card-${i} > .icon-container > .info__url`);
				let link = document.querySelector(`.card-${i} > .icon-container > .info__link`);

				// Grabs result and store it into the DOM
				let result = ({
					title: selectResult.title,
					sub: selectResult.subreddit,
					url: selectResult.url,
					link: selectResult.full_link,
					comNum: selectResult.num_comments
				});

				// Number of comments in reddit  
				let cNum = result.comNum;
				let appendNum = (cNum == 0) ? "" : (cNum > 1) ? ", " + cNum + " comments" : ", " + cNum + " comment";


				title.textContent = result.title;
				sub.textContent = result.sub + appendNum;
				url.href = result.url;
				link.href = result.link;
			}

		})
		// Toggles loading off after fetch is completed 
		.then(toggleLoadingOff)
		// Toggles result display on after fetch is completed 
		.then(toggleDisplayOn)
		//Catches errors 
		.catch(console.error)
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
	loader.style.display = "flex";
	(searchInput.value === "") ? alert("Please input text"): fetchSub(searchInput.value);
}
searchBarBtn.addEventListener("click", searchTheInput);
searchInput.addEventListener("keypress", e => (e.keyCode == 13) && searchTheInput());


// Toggles loading sign to off
function toggleLoadingOff() {
	loader.style.display = "none";
}

// Toggles result display  on 
function toggleDisplayOn() {
	cardContainer.style.visibility = "visible";
}


// ----------- init -----------
reset();