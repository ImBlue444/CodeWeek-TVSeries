const body = document.querySelector("body");
const topNav = document.createElement("nav");
const ulNav = document.createElement("ul");
const aNavLogo = document.createElement("a");
const aNavHome = document.createElement("a");
const aNavStore = document.createElement("a");
const aNavCanali = document.createElement("a");
const aNavCategorie = document.createElement("a");
const movieCardsDiv = document.createElement("div");

let selectedSerie = 0

//NavBar
const navCreator = () => {
    body.appendChild(topNav);
    topNav.appendChild(ulNav);
    ulNav.append(aNavLogo, aNavHome, aNavStore, aNavCanali, aNavCategorie);
    
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
}
navCreator();
//NavBar

let cardsDivTitle = () =>{
  const cardsDiv = document.createElement("div")
  cardsDiv.classList.add("cardsDivTitle");
  body.appendChild(cardsDiv);
  const sectionTitle = document.createElement("h2");
  sectionTitle.textContent = "Serie TV: Popolari"
  cardsDiv.appendChild(sectionTitle);
}
cardsDivTitle();

let APIdiv = document.createElement("div");
APIdiv.classList.add("wrapperSerie");
body.appendChild(APIdiv);


const createCard = (imgUrl, idSerie) => {
  const divEl = document.createElement("div");
  const imgEl = document.createElement("img");
  divEl.setAttribute("id", idSerie)
  divEl.classList.add("card");

  imgEl.setAttribute("src", imgUrl);
  imgEl.setAttribute("alt", "img not found");

  divEl.append(imgEl);

  document.querySelector(".wrapperSerie").appendChild(divEl);
};

async function getAPI() {
  const res = await fetch("https://api.themoviedb.org/3/trending/tv/day?api_key=4a57dda3c00e709f26b32950742b7b77");
  const data = await res.json();
  console.log(data.results)
  return data.results;
}


getAPI()
.then((series) =>{
  series.map((element)=>{
    createCard("https://image.tmdb.org/t/p/w500/"+element.poster_path, element.id)
  })
})

.then(() =>{
  const cardsEl = document.querySelectorAll(".card");
  cardsEl.forEach((serie)=>{
    serie.addEventListener("click", () =>{
      let id = serie.id
      window.location = "details.html?id=" + id;
    })
  })
})