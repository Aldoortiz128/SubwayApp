window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    NYPDTweetFetch()
    MTATweetFetch()
}
)

//Notes:
//Set the alternative image to articles without an image to the MTA Logo***
//Have progress loading bar for each DOM Content 
//Dynamically size Articles with Flexbox

//A Month Before This Date

const d = new Date();
console.log(d.toLocaleDateString());
const month = d.getMonth();
d.setMonth(d.getMonth() - 1);
while (d.getMonth() === month) {
    d.setDate(d.getDate() - 1);
}
console.log(d.toLocaleDateString());


let monthBeforeDate = d.toISOString().split('T')[0]
console.log(monthBeforeDate) //Always a month before

var url = 'https://newsapi.org/v2/everything?' +
          'q=MTA+NYC+crime&' +
          `from=${monthBeforeDate}&` +
          'sortBy=popularity&' +
          'apiKey=afa69d40429845f6918197165bc92bc6';
//Update to be dynamic and pull data based on current date using string interpolation

var req = new Request(url);

let allArticles;
let targetArticle;
let titleArticle;
let authorArticle;
let timeArticle;
let listArticles = document.getElementById('articles')


fetch(req)
    .then(response => response.json()) 

    .then(response => {
        console.log(response.articles)

    allArticles = response.articles

    for (let i = 0; i < allArticles.length; i++) {
        targetArticle = allArticles[i]
        titleArticle = targetArticle.title
        authorArticle = targetArticle.source.name
        timeArticle = targetArticle.publishedAt.substring(0,10)
        console.log(titleArticle)

        let articleHeaderLi = document.createElement('ul')
        let articleHeader = document.createElement('a')
        let articlePublication = document.createElement('h1')
        let articleDate = document.createElement('p')
        let articleImage = document.createElement('img')
        let articleBreak = document.createElement('br')
        articleImage.src=allArticles[i].urlToImage
    // articleImage.src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/MTA_NYC_logo.svg/1862px-MTA_NYC_logo.svg.png"
        function imgLoad(){
            articleImage.src=allArticles[i].urlToImage
        }
        function imgError(){
            articleImage.onload=null
            articleImage.src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/MTA_NYC_logo.svg/1862px-MTA_NYC_logo.svg.png";
            articleImage.width="600"
            articleImage.height="600"
        }
        articlePublication.innerText = authorArticle
        articleDate.innerText = timeArticle
        articleHeader.innerText = titleArticle
        articleHeader.href = targetArticle.url

        let timeoutID;
        function delayedLoad() {
        timeoutID = setTimeout(imgError(), 2*5000);
        }
        articleImage.onload=imgLoad
        articleImage.onerror=delayedLoad
        articleImage.width="800"
        articleImage.height="600"
        articleImage.alt=targetArticle.source.name
        let articleButton = document.createElement('button')
        listArticles.appendChild(articlePublication)
        articlePublication.appendChild(articleDate)
        articleDate.appendChild(articleHeaderLi)
        articleHeaderLi.appendChild(articleButton)
        articleButton.appendChild(articleHeader)
        articleHeader.appendChild(articleBreak)
        articleHeader.appendChild(articleImage)
    }
}
)

//Function to FetchCall for all NYPD Update Tweets
function NYPDTweetFetch() {
let allNYPDTweets;
let tweetUrl;


// Tweets for NYPD Transit commented out For Now -- must add Event Listener
 fetch("https://twitter135.p.rapidapi.com/UserTweets/?id=2795834466&count=21", {
 	"method": "GET",
 	"headers": {
 		"x-rapidapi-host": "twitter135.p.rapidapi.com",
 		"x-rapidapi-key": "518100b9f8mshb80f400f53a15c9p18dc87jsn8ddb456d1fdc"
 	}
 })
 .then(response => response.json())


 .then(response => {

     allNYPDTweets = 
     response
     .data
     .user
     .result
     .timeline
     .timeline
     .instructions[1]
     console.log(allNYPDTweets)
    
//     //First Half of Tweets
    for (let i = 0; i <= 5; i++) {

    let tweetHeaderLi = document.createElement('ul')
    
    let tweetContent = allNYPDTweets

    

    console.log("@NYPDTransit")
    
    console.log(
     allNYPDTweets
     .entries[i]
     .content
     .itemContent
     .tweet_results
     .result
     .legacy
     .full_text
     );
    
     console.log(
     allNYPDTweets
     .entries[i]
     .content
     .itemContent
     .tweet_results
     .result
     .legacy
     .created_at
     );

     tweetUrl = 
    allNYPDTweets
    .entries[i]
     .content
     .itemContent
    .tweet_results
    .result
     .legacy
     .id_str
    

    console.log(
         `https://twitter.com/NYPDTransit/status/${tweetUrl}`
         );
     }
    
   
    
//2nd Half of Tweets
    for (let i = 7; i <= 20; i++) {
        console.log("@NYPDTransit")
        console.log(
        allNYPDTweets
         .entries[i]
         .content
         .itemContent
         .tweet_results
        .result
        .legacy
        .full_text
         )
    
     console.log(
         allNYPDTweets
         .entries[i]
         .content
         .itemContent
         .tweet_results
         .result
         .legacy
         .created_at
         );

        
     tweetUrl = allNYPDTweets
    .entries[i]
    .content
     .itemContent
    .tweet_results
     .result
     .legacy
     .id_str
    
    

     console.log(
       `https://twitter.com/NYPDTransit/status/${tweetUrl}`
        );
    
    
     }
    
     })
 .catch(err => {
     console.error(err);}
)
 }


//Function to FetchCall for all Subway Update Tweets
function MTATweetFetch() {
 let allMTATweets;

//Tweets for MTA Subway Updates

//

fetch("https://twitter135.p.rapidapi.com/UserTweets/?id=66379182&count=21", {
	"method": "GET",
 	"headers": {
 		"x-rapidapi-host": "twitter135.p.rapidapi.com",
 		"x-rapidapi-key": "518100b9f8mshb80f400f53a15c9p18dc87jsn8ddb456d1fdc"
 	}
 })
 .then(response => response.json())

 .then(response => {

 allMTATweets = 
 response
.data
.user
.result
.timeline
.timeline
.instructions[1]
console.log(allMTATweets)

//First Half of Tweets
for (let i = 0; i <= 5; i++) {
console.log("@NYCTSubway")
console.log(
allMTATweets
.entries[i]
.content
.itemContent
.tweet_results
.result
.legacy
.full_text
);

console.log(
allMTATweets
.entries[i]
.content
.itemContent
.tweet_results
.result
.legacy
.created_at
);


tweetUrl = 
allMTATweets
.entries[i]
.content
.itemContent
.tweet_results
.result
.legacy
.id_str


console.log(
    `https://twitter.com/NYCTSubway/status/${tweetUrl}`
    );
}



//2nd Half of Tweets
for (let i = 7; i <= 20; i++) {
    console.log("@NYCTSubway")
    console.log(
    allMTATweets
    .entries[i]
    .content
    .itemContent
    .tweet_results
    .result
    .legacy
    .full_text
    )

console.log(
    allMTATweets
    .entries[i]
    .content
    .itemContent
    .tweet_results
    .result
    .legacy
    .created_at
    );

tweetUrl = allMTATweets
.entries[i]
.content
.itemContent
.tweet_results
.result
.legacy
.id_str

console.log(
    `https://twitter.com/NYCTSubway/status/${tweetUrl}`
    );

}

})
.catch(err => {
    console.error(err);}
)
}

