var url = 'https://newsapi.org/v2/everything?' +
          'q=MTA&' +
          'from=2022-02-02&' +
          'sortBy=popularity&' +
          'apiKey=afa69d40429845f6918197165bc92bc6';

var req = new Request(url);

let allArticles;
let targetArticle;
let titleArticle;


fetch(req)
    .then(response => response.json()) 

    .then(response => {
        console.log(response.articles)

    allArticles = response.articles
    
    for (let i = 0; i < allArticles.length; i++) {
        console.log(allArticles[i])
    }

}
)




    


