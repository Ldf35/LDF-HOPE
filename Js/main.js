document.addEventListener("DOMContentLoaded", () => {

const header = document.getElementById("header");
const menu = document.getElementById("mobileMenu");
const nav = document.getElementById("navigation");


/* HEADER */

function headerScroll(){

if(!header) return;

if(window.scrollY > 40){
header.classList.add("scrolled");
}else{
header.classList.remove("scrolled");
}

}

headerScroll();

window.addEventListener("scroll",headerScroll,{
passive:true
});


/* MOBILE MENU */

if(menu && nav){

menu.addEventListener("click",()=>{

nav.classList.toggle("mobile-open");

});

}


/* CLOSE MOBILE MENU */

document.querySelectorAll("nav a").forEach(link=>{

link.addEventListener("click",()=>{

if(nav){
nav.classList.remove("mobile-open");
}

});

});


/* SMOOTH INTERNAL LINKS */

document.querySelectorAll('a[href^="#"]').forEach(link=>{

link.addEventListener("click",event=>{

const target=document.querySelector(
link.getAttribute("href")
);

if(!target) return;

event.preventDefault();

target.scrollIntoView({
behavior:"smooth",
block:"start"
});

});

});


/* REVEAL ANIMATIONS */

const reveal=document.querySelectorAll(
".programme-main,.small-programme,.focus-card,.involved-card,.timeline-row,.gallery-item,.programme-detail"
);

const revealObserver=new IntersectionObserver(
entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("visible");

revealObserver.unobserve(entry.target);

}

});

},
{
threshold:.08
}
);

reveal.forEach(item=>{
revealObserver.observe(item);
});


/* GALLERY FILTER */

const filters=document.querySelectorAll(
".gallery-filter button"
);

const galleryItems=document.querySelectorAll(
".gallery-item"
);

filters.forEach(button=>{

button.addEventListener("click",()=>{

filters.forEach(btn=>{
btn.classList.remove("active");
});

button.classList.add("active");

const filter=button.dataset.filter;

galleryItems.forEach(item=>{

if(
filter==="all" ||
item.classList.contains(filter)
){

item.style.display="block";

}else{

item.style.display="none";

}

});

});

});


/* IMAGE LIGHTBOX */

const images=document.querySelectorAll(
".gallery-item img,.wall-photo img,.mini-gallery img"
);

let modal;

function createModal(){

modal=document.createElement("div");

modal.className="image-modal";

modal.innerHTML=`
<button class="image-close">×</button>
<img src="" alt="">
`;

document.body.appendChild(modal);

modal.addEventListener("click",event=>{

if(
event.target===modal ||
event.target.classList.contains("image-close")
){

modal.classList.remove("open");

document.body.style.overflow="";

}

});

}

createModal();

images.forEach(image=>{

image.addEventListener("click",()=>{

const modalImage=modal.querySelector("img");

modalImage.src=image.src;
modalImage.alt=image.alt;

modal.classList.add("open");

document.body.style.overflow="hidden";

});

});


document.addEventListener("keydown",event=>{

if(
event.key==="Escape" &&
modal
){

modal.classList.remove("open");

document.body.style.overflow="";

}

});

});
