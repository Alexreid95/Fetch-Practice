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

function displayInfo {
    const title = document.querySelector(".");
    const sub = document.querySelector(".");
    const url = document.querySelector(".");
    const link = document.querySelector(".");



}

fetchSub("animated sidebar menu with html & css");
