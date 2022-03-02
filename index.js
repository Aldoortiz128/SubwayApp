window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

var url = 'https://newsapi.org/v2/everything?' +
          'q=MTA+NYC+crime&' +
          'from=2022-02-02&' +
          'sortBy=popularity&' +
          'apiKey=afa69d40429845f6918197165bc92bc6';
//Update to be dynamic and pull data based on current date using string interpolation

var req = new Request(url);

let allArticles;
let targetArticle;
let titleArticle;
let listArticles = document.getElementById('articles')


fetch(req)
    .then(response => response.json()) 

    .then(response => {
        console.log(response.articles)

    allArticles = response.articles

    for (let i = 0; i < allArticles.length; i++) {
        targetArticle = allArticles[i]
        titleArticle = targetArticle.title
        console.log(titleArticle)

        let articleHeaderLi = document.createElement('ul')
        let articleHeader = document.createElement('a')
        let articleImage = document.createElement('img')
        let articleBreak = document.createElement('br')
        articleHeader.innerText = titleArticle
        articleHeader.href = targetArticle.url
        articleImage.src=targetArticle.urlToImage
        articleImage.width="250"
        articleImage.height="300"
        articleImage.alt=targetArticle.source.name
        let articleButton = document.createElement('button')

        listArticles.appendChild(articleHeaderLi)
        articleHeaderLi.appendChild(articleButton)
        articleButton.appendChild(articleHeader)
        articleHeader.appendChild(articleBreak)
        articleHeader.appendChild(articleImage)
        //articleBreak.appendChild(articleImage)
    }
}
)

//Subway Updates Tweets
fetch("https://twitterfetch.p.rapidapi.com/user/NYCTSubway", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "twitterfetch.p.rapidapi.com",
		"x-rapidapi-key": "518100b9f8mshb80f400f53a15c9p18dc87jsn8ddb456d1fdc"
	}
})
.then(response => response.json())
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});


//Train Crime Tweets
fetch("https://twitterfetch.p.rapidapi.com/user/NYPDTransit", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "twitterfetch.p.rapidapi.com",
		"x-rapidapi-key": "518100b9f8mshb80f400f53a15c9p18dc87jsn8ddb456d1fdc"
	}
})
.then(response => response.json())
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});

// //Complicated MTA Tweet Fetch
// fetch("https://twitter60.p.rapidapi.com/user_tweets?user_id=94129050", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "twitter60.p.rapidapi.com",
// 		"x-rapidapi-key": "518100b9f8mshb80f400f53a15c9p18dc87jsn8ddb456d1fdc"
// 	}
// })
// .then(response => response.json())
// .then(response => {
// 	console.log(
// response
// .data
// .user
// .result
// .timeline
// .timeline
// .instructions[1]
// .entries[0]
// .content
// .itemContent
// .tweet_results
// .result
// .legacy
// .full_text
// );
// })
// .catch(err => {
// 	console.error(err);
// });

}
)