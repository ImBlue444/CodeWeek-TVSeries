const params = new URLSearchParams(window.location.search)
var id = 0;

if (params.has("id")) {
    id = params.get("id");
} else {
    window.location = "index.html";
}
//Non inserisco la traduzione poiché molte serie non sono complete
async function getTVSeriesData() {
    const response = await fetch("https://api.themoviedb.org/3/tv/" + id + "?api_key=4a57dda3c00e709f26b32950742b7b77", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    return response.json();
}

async function getTVSeriesVideo() {
    const response = await fetch("https://api.themoviedb.org/3/tv/" + id + "/videos?api_key=4a57dda3c00e709f26b32950742b7b77", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    return response.json();
}
const body = document.querySelector("body");


const topNav = document.createElement("nav");
const ulNav = document.createElement("ul");
const aNavLogo = document.createElement("a");
const aNavHome = document.createElement("a");
const aNavStore = document.createElement("a");
const aNavCanali = document.createElement("a");
const aNavCategorie = document.createElement("a");
const aNavIndietro = document.createElement("a");
const movieCardsDiv = document.createElement("div");
//NavBar
const navCreator = () => {
    body.appendChild(topNav);
    topNav.appendChild(ulNav);
    ulNav.append(aNavLogo, aNavHome, aNavStore, aNavCanali, aNavCategorie, aNavIndietro);
    
    
    topNav.classList.add("topNav");
    //
    aNavLogo.classList.add("logoPrime");
    const logoDiv = document.createElement("div");
    const logoImg = document.createElement("img")
    logoDiv.appendChild(logoImg);
    logoImg.setAttribute("src","img/logosmall.png");
    aNavLogo.appendChild(logoDiv);
    //
    aNavHome.setAttribute("href","index.html");
    aNavHome.textContent = "Home";
    //
    aNavStore.setAttribute("href","https://www.amazon.it/");
    aNavStore.textContent = "Store";
    //
    aNavCanali.setAttribute("href","#");
    aNavCanali.textContent = "Canali";
    //
    aNavCategorie.setAttribute("href","#");
    aNavCategorie.textContent = "Categorie";

    aNavIndietro.classList.add("indietro");
    aNavIndietro.setAttribute("href","index.html");
    aNavIndietro.textContent = "Indietro";
}
navCreator();



  const createDetails = (title, desc, vote, numEp, numSt) => {
    const detailsDiv = document.createElement("div")
    const titleEl = document.createElement("h2");
    const descEl = document.createElement("p");
    const voteEl = document.createElement("p")
    const numEpEl = document.createElement("p")
    const numStEl = document.createElement("p")

    titleEl.textContent = title;
    descEl.textContent = desc;
    voteEl.textContent = "Voto: " + vote;
    numEpEl.textContent = "Episodi: "+ numEp;
    numStEl.textContent = "Stagioni: "+ numSt;

    detailsDiv.classList.add("detailsDiv");
    titleEl.classList.add("detailsTitle");
    descEl.classList.add("detailsDesc");
    voteEl.classList.add("voteEl");
    numEpEl.classList.add("numEpEl");
    numStEl.classList.add("numStEl");

    body.appendChild(detailsDiv);
    detailsDiv.append(titleEl, descEl, voteEl, numEpEl, numStEl)

  };

  const createVideo = (videoURL) =>{
    const videoEl = document.createElement("iframe");
    videoEl.classList.add("videoEl")
    videoEl.setAttribute("src", videoURL)
    videoEl.setAttribute("width", "680px")
    videoEl.setAttribute("height", "800px")
    body.append(videoEl)
  }

  getTVSeriesVideo()
  .then((video)=>{
   createVideo("https://www.youtube.com/embed/" + video.results[0].key)
  });

 getTVSeriesData()
 .then((details)=>{
     createDetails(details.name, details.overview, details.vote_average, details.number_of_episodes, details.number_of_seasons);
 });