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
        articleHeader.innerText = titleArticle
        articleHeader.href = targetArticle.url
        let articleButton = document.createElement('button')

        listArticles.appendChild(articleHeaderLi)
        articleHeaderLi.appendChild(articleButton)
        articleButton.appendChild(articleHeader)
        
    }
}
)

const https = require('https');
https.get(
  "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-bdfm",
  { headers: { "x-api-key": 'lOW2hqGP0nbKbmx535RD28c1DonpfDF58UCbCfu3'}
  },
  (resp) => {
    resp.on('data', (chunk) => {
      console.log("Receiving Data");
    });
    resp.on('end', () => {
      console.log("Finished receiving data");
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });





    


