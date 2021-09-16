const auth="563492ad6f917000010000016cfe8b156888453eb404a75564bb3bff";
const gallery= document.querySelector(".gallery");
const searchInput= document.querySelector(".search-input");
const submitButton= document.querySelector(".submit-btn");
const form = document.querySelector(".search-form");
const more= document.querySelector(".more");
let page=1;
let fetchLink;
let currentSearch;
let searchValue;


//Event Listener

searchInput.addEventListener("input",updateInput);
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    currentSearch=searchValue;
    searchPhotos(searchValue);
})
function updateInput(e){
    searchValue= e.target.value;
}


more.addEventListener("click",loadMore);


async function fetchApi(url){
    const dataFetch = await fetch(url,{
        method:"GET",
        headers:{
            Accept:"application/json",
            Authorization:auth
        }
    });

    const data =  await dataFetch.json();
    return data;

}


function generatePictures(data){
    data.photos.forEach(photo=>{
        console.log(photo);
        const galleryImg=document.createElement("div");
        galleryImg.classList.add("gallery-img");
        galleryImg.innerHTML=`
        <p>${photo.photographer}</p>
        <div class="gallery-info">
        <img src=${photo.src.large}> 
        </div>
        <a href=${photo.src.original}>Download</a>`
        ;
        gallery.appendChild(galleryImg)

    });
}
async function curatedPhotos(){
    fetchLink= "https://api.pexels.com/v1/curated?per_page=15"

const data = await fetchApi(fetchLink);
generatePictures(data);
}


async function searchPhotos(query){
 clear();
 fetchLink=`https://api.pexels.com/v1/search?query=${query}&per_page=15`
const data = await fetchApi(fetchLink);
generatePictures(data);

}


function clear(){
    gallery.innerHTML="";
    searchInput.value="";
}
clear();



async function loadMore(){
    page++;
    if(currentSearch){
        fetchLink=`https://api.pexels.com/v1/search?query=${currentSearch}&page=${page}`
    }else{
        fetchLink=`https://api.pexels.com/v1/curated?per_page=15&page=${page}`
    }

    const data = await fetchApi(fetchLink);
generatePictures(data)
}

curatedPhotos();
searchPhotos();