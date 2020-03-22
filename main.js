// Returns Sub from Reddit
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

function displayInfo(object) {
	const title = document.querySelector(".info__title");
	const sub = document.querySelector(".info__sub");
	const url = document.querySelector(".info__url");
	const link = document.querySelector(".info__link");

	title.textContent = object.title;
	sub.textContent = object.sub;
	url.textContent = object.url;
	link.textContent = object.link;
}

fetchSub("world");