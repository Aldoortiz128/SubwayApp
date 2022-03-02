var url = 'https://newsapi.org/v2/everything?' +
          'q=MTA&' +
          'from=2022-02-02&' +
          'sortBy=popularity&' +
          'apiKey=afa69d40429845f6918197165bc92bc6';

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

        let articleHeader = document.createElement('a')
        articleHeader.innerText = titleArticle
        articleHeader.href = targetArticle.url

        let articleHeaderLi = document.createElement('li')
        listArticles.appendChild(articleHeaderLi)
        articleHeaderLi.appendChild(articleHeader)
        
    }
}
)





    


