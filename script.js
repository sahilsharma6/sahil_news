const API_KEY = "90cf8c16807d4902ba1639fe2fd9665e";

const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", ()=>fetchNews("India"));

async function fetchNews(query){
  const res= await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  console.log(data);
  bindData(data.articles)
}

function bindData(articles){
    const cardContainer = document.getElementById("card-container")
    const newsCardTemplate = document.getElementById("template-news-card");

    cardContainer.innerHTML="";

    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"  
    }) ;

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsSource.innerHTML = `${article.source.name}-${date}`;
    newsDesc.innerHTML = article.description;

    cardClone.firstElementChild.addEventListener("click", ()=>{
        window.open(article.url, "_blank");
    })
}

// 
let currnav = null;
function navRes(id){
let navRes = document.getElementById(id);
navRes.addEventListener("click", ()=>{
    fetchNews(id);
    currnav?.classList.remove("active");
    currnav = navRes;
    currnav.classList.add("active")
})
}
navRes("Ipl");navRes("Tech");navRes("Finance");navRes("Politics");
// 

let sb = document.querySelector(".news-input");
let b = document.querySelector(".search-news");

b.addEventListener("click", ()=>{
 if(sb.value==""){
    fetchNews("India")
 }else{
    fetchNews(sb.value)
 };
 sb.value="";
 currnav?.classList.remove("active");
});


sb.addEventListener("keypress", (e)=>{
let inputVal = sb.value;
if(e.key==="Enter"){
    if(inputVal===""){
    fetchNews("India")
    }else{
        fetchNews(inputVal)
    }
    sb.value="";
    currnav?.classList.remove("active");

}
})




function reload(){
    window.location.reload()
}



// changed