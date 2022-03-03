window.addEventListener('DOMContentLoaded', (event) => {
    
    console.log('DOM fully loaded and parsed');
    NYPDTweetFetch()
    MTATweetFetch()


//NYC Crime API

//     fetch("https://data.cityofnewyork.us/resource/5uac-w243.json?$$app_token=CaIib4ywwEipZFXnVcT8EUsyV", {
//         "method": "GET"
//     }
//     )
//     .then(response => response.json())
//     .then(response => console.log(response))
    
// }
// )
document.getElementById('NYPDTweets').style.display='none'
let crimeFeed= document.getElementById('crimeFeed')
crimeFeed.addEventListener('click', () => {
    document.getElementById('NYPDTweets').style.display='block'
    document.getElementById('articles').style.display='none'
    document.getElementById('MTATweets').style.display='none'
})


document.getElementById('articles').style.display='none'
    let news= document.getElementById('news')
    news.addEventListener('click', () => {
        document.getElementById('articles').style.display='block'
        document.getElementById('NYPDTweets').style.display='none'
        document.getElementById('MTATweets').style.display='none'
    })

document.getElementById('MTATweets').style.display='none'
let updates= document.getElementById('updates')
updates.addEventListener('click', () => {
    document.getElementById('MTATweets').style.display='block'
    document.getElementById('NYPDTweets').style.display='none'
    document.getElementById('articles').style.display='none'
})
//Notess:
//Stretch feature: witness a crime?
//add a POST request form to the contact us page (alerts by users board with user location)
//then fetch that data so the page constantly updates?
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

let allArticles; //holds entire fetch response object
let targetArticle; //current article we are iterating
let titleArticle; //title of the current article we are iterating
let authorArticle; // author of the current article we are iterating
let timeArticle; // time the aricle was posted
//grabs article div
let articleDiv = document.getElementById('articles')


fetch(req)
    .then(response => response.json()) 

    .then(response => {
        console.log(response.articles)

    allArticles = response.articles // line 43 in effect

    for (let i = 0; i < allArticles.length; i++) { //loop to iterate through the articles
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
        articleHeader.target = "_blank"

        let timeoutID;
        function delayedLoad() {
        timeoutID = setTimeout(imgError(), 2*5000);
        }
        articleImage.onload=imgLoad
        articleImage.onerror=delayedLoad
        articleImage.width="800"
        articleImage.height="600"
        articleImage.alt=targetArticle.source.name
        let articleCard = document.createElement('div')
        articleCard.className = "articleCard"
        // articleCard.style.width="800"
        // articleCard.style.height="400"
        //articleCard.style.backgroundColor="white"
        //articleDiv.appendChild(articlePublication)
        //articlePublication.appendChild(articleDate)
        //articleDate.appendChild(articleHeaderLi)
        articleDiv.appendChild(articleHeaderLi)
        articleHeaderLi.appendChild(articleCard)
        articleCard.appendChild(articlePublication)
        articlePublication.appendChild(articleDate)
        articleCard.appendChild(articleHeader)
        articleHeader.appendChild(articleBreak)
        articleHeader.appendChild(articleImage)
    }
}
)




//Function to FetchCall for all NYPD Update Tweets
function NYPDTweetFetch() {
let allNYPDTweets;
let hashtag = "@NYPDTransit"
let tweetText;
let tweetTime;
let tweetUrl;
let tweetMedia;


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

    //variable containing the data set of all NYPD Tweets
     allNYPDTweets = 
     response
     .data
     .user
     .result
     .timeline
     .timeline
     .instructions[1]
     console.log(allNYPDTweets)
    
 //First Half of Tweets
    for (let i = 0; i <= 5; i++) {

        //The data containing text of the tweet
        tweetText=
        allNYPDTweets
        .entries[i]
        .content
        .itemContent
        .tweet_results
        .result
        .legacy
        .full_text
        


        //The data containing timestamp of the tweet
        tweetTime=
        allNYPDTweets
        .entries[i]
        .content
        .itemContent
        .tweet_results
        .result
        .legacy
        .created_at
        
        //The data containing the url of the tweet
        tweetUrl = 
        allNYPDTweets
        .entries[i]
        .content
        .itemContent
        .tweet_results
        .result
        .legacy
        .id_str

         //The data containing the images of the tweet
        tweetMedia=
        allNYPDTweets
        .entries[i]
        .content
        .itemContent
        .tweet_results
        .result
        .legacy
        .entities
        console.log(tweetMedia)
        
        
        //Clickable url - string interpolation of URL Data property
        clickUrl = `https://twitter.com/NYPDTransit/status/${tweetUrl}`
        
        //grabs NYPD Tweet div
        let NYPDTweetDiv = document.getElementById('NYPDTweets')
        //creates new elements to place tweets
        let tweetHeaderLi = document.createElement('ul')
        let tweetDiv = document.createElement('div')
        tweetDiv.classList.add("NYPDTweetDivs")
        let tweetHeader = document.createElement('h1')
        let tweetBreak = document.createElement('br')
        let tweetUser = document.createElement('a')
        let tweetIcon = document.createElement('img')
        //let tweetImage = document.createElement('img')
        let tweetDesc = document.createElement('p')
        let tweetStamp = document.createElement('p')
        
        //styling of new elements
        tweetHeader.innerText = "NYPD Transit"
        tweetIcon.height="50"
        tweetIcon.width="50"
        // tweetDiv.style.width="50vh"
        // tweetDiv.style.height="50vh"
        //tweetDiv.style.backgroundColor="white"
        tweetIcon.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/MTA_NYC_logo.svg/1862px-MTA_NYC_logo.svg.png"
        //tweetImage.src = tweetMedia
        tweetUser.innerText = hashtag
        tweetUser.href = clickUrl
        tweetUser.target = "_blank"
        tweetDesc.innerText = tweetText
        tweetStamp.innerText = tweetTime
        
        //appending of new elements to the DOM
        NYPDTweetDiv.appendChild(tweetHeaderLi)
        tweetHeaderLi.appendChild(tweetDiv)
        tweetDiv.appendChild(tweetIcon)
        tweetDiv.appendChild(tweetHeader)
        tweetHeader.appendChild(tweetBreak)
        tweetDiv.appendChild(tweetUser)
        tweetDiv.appendChild(tweetDesc)
        tweetDiv.appendChild(tweetStamp)
     }
    
   
    
//2nd Half of Tweets
    for (let i = 7; i <= 8; i++) {
     
        tweetText=
        allNYPDTweets
        .entries[i]
        .content
        .itemContent
        .tweet_results
        .result
        .legacy
        .full_text
        
        tweetTime=
        allNYPDTweets
        .entries[i]
        .content
        .itemContent
        .tweet_results
        .result
        .legacy
        .created_at
        
        tweetUrl = 
        allNYPDTweets
        .entries[i]
        .content
        .itemContent
        .tweet_results
        .result
        .legacy
        .id_str

        //The data containing the images of the tweet
        // tweetMedia=
        //  allNYPDTweets
        // .entries[i]
        // .content
        // .itemContent
        // .tweet_results
        // .result
        // .legacy
        // .entities
        // .media[0]
        // .media_url_https
        
        clickUrl = `https://twitter.com/NYPDTransit/status/${tweetUrl}`
        
        //grabs NYPD Tweet div
        let NYPDTweetDiv = document.getElementById('NYPDTweets')
        let tweetHeaderLi = document.createElement('ul')
        let tweetDiv = document.createElement('div')
        tweetDiv.className = "NYPDTweetDivs"
        let tweetHeader = document.createElement('h1')
        let tweetBreak = document.createElement('br')
        let tweetUser = document.createElement('a')
        let tweetIcon = document.createElement('img')
        //let tweetImage = document.createElement('img')
        let tweetDesc = document.createElement('p')
        let tweetStamp = document.createElement('p')
        
        
        tweetHeader.innerText = "NYPD Transit"
        tweetIcon.height="50"
        tweetIcon.width="50"
        // tweetDiv.style.width="50vh"
        // tweetDiv.style.height="50vh"
        //tweetDiv.style.backgroundColor="white"
        tweetIcon.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/MTA_NYC_logo.svg/1862px-MTA_NYC_logo.svg.png"
        //tweetImage.src = tweetMedia
        tweetUser.innerText = hashtag
        tweetUser.href = clickUrl
        tweetUser.target = "_blank"
        tweetDesc.innerText = tweetText
        tweetStamp.innerText = tweetTime
        
        
        NYPDTweetDiv.appendChild(tweetHeaderLi)
        tweetHeaderLi.appendChild(tweetDiv)
        tweetDiv.appendChild(tweetIcon)
        tweetDiv.appendChild(tweetHeader)
        tweetHeader.appendChild(tweetBreak)
        tweetDiv.appendChild(tweetUser)
        //tweetDiv.appendChild(tweetImage)
        tweetDiv.appendChild(tweetDesc)
        tweetDiv.appendChild(tweetStamp)
    
     }
    
     })
 .catch(err => {
     console.error(err);}
)
 }


//Function to FetchCall for all Subway Update Tweets
function MTATweetFetch() {


 let allMTATweets;
 let hashtag = "@NYCTSubway"
 let tweetText;
 let tweetTime;
 let tweetUrl;
 let clickUrl;





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
// storing tweets in an object variable 
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
//console.log(hashtag)

tweetText=
allMTATweets
.entries[i]
.content
.itemContent
.tweet_results
.result
.legacy
.full_text

tweetTime=
allMTATweets
.entries[i]
.content
.itemContent
.tweet_results
.result
.legacy
.created_at

tweetUrl = 
allMTATweets
.entries[i]
.content
.itemContent
.tweet_results
.result
.legacy
.id_str

clickUrl = `https://twitter.com/NYCTSubway/status/${tweetUrl}`

//grabs MTA Tweet div
let MTATweetDiv = document.getElementById('MTATweets')
let tweetHeaderLi = document.createElement('ul')
let tweetDiv = document.createElement('div')
tweetDiv.className = "MTATweetDivs"
let tweetHeader = document.createElement('h1')
let tweetBreak = document.createElement('br')
let tweetUser = document.createElement('a')
let tweetIcon = document.createElement('img')
let tweetDesc = document.createElement('p')
let tweetStamp = document.createElement('p')


tweetHeader.innerText = "NYCT Subway. Wear A Mask."
tweetIcon.height="50"
tweetIcon.width="50"
// tweetDiv.style.width="50vh"
// tweetDiv.style.height="50vh"
//tweetDiv.style.backgroundColor="white"
tweetIcon.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/MTA_NYC_logo.svg/1862px-MTA_NYC_logo.svg.png"
tweetUser.innerText = hashtag
tweetUser.href = clickUrl
tweetUser.target = "_blank"
tweetDesc.innerText = tweetText
tweetStamp.innerText = tweetTime


MTATweetDiv.appendChild(tweetHeaderLi)
tweetHeaderLi.appendChild(tweetDiv)
tweetDiv.appendChild(tweetIcon)
tweetDiv.appendChild(tweetHeader)
tweetHeader.appendChild(tweetBreak)
tweetDiv.appendChild(tweetUser)
tweetDiv.appendChild(tweetDesc)
tweetDiv.appendChild(tweetStamp)
    
}



//2nd Half of Tweets
for (let i = 7; i <= 8; i++) {
    //console.log(hashtag)


    tweetText=
    allMTATweets
    .entries[i]
    .content
    .itemContent
    .tweet_results
    .result
    .legacy
    .full_text
    
    tweetTime=
    allMTATweets
    .entries[i]
    .content
    .itemContent
    .tweet_results
    .result
    .legacy
    .created_at
    
    tweetUrl = 
    allMTATweets
    .entries[i]
    .content
    .itemContent
    .tweet_results
    .result
    .legacy
    .id_str
    
    clickUrl = `https://twitter.com/NYCTSubway/status/${tweetUrl}`
    
    //grabs MTA Tweet div
    let MTATweetDiv = document.getElementById('MTATweets')
    let tweetHeaderLi = document.createElement('ul')
    let tweetDiv = document.createElement('div')
    tweetDiv.className = "MTATweetDivs"
    let tweetHeader = document.createElement('h1')
    let tweetBreak = document.createElement('br')
    let tweetUser = document.createElement('a')
    let tweetIcon = document.createElement('img')
    let tweetDesc = document.createElement('p')
    let tweetStamp = document.createElement('p')
    
    
    tweetHeader.innerText = "NYCT Subway. Wear A Mask."
    tweetIcon.height="50"
    tweetIcon.width="50"
    // tweetDiv.style.width="50vh"
    // tweetDiv.style.height="50vh"
    //tweetDiv.style.backgroundColor="white"
    tweetIcon.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/MTA_NYC_logo.svg/1862px-MTA_NYC_logo.svg.png"
    tweetUser.innerText = hashtag
    tweetUser.href = clickUrl
    tweetUser.target="_blank"
    tweetDesc.innerText = tweetText
    tweetStamp.innerText = tweetTime
    
    
    MTATweetDiv.appendChild(tweetHeaderLi)
    tweetHeaderLi.appendChild(tweetDiv)
    tweetDiv.appendChild(tweetIcon)
    tweetDiv.appendChild(tweetHeader)
    tweetHeader.appendChild(tweetBreak)
    tweetDiv.appendChild(tweetUser)
    tweetDiv.appendChild(tweetDesc)
    tweetDiv.appendChild(tweetStamp)
    

}

})
.catch(err => {
    console.error(err);}
)
}

}
)