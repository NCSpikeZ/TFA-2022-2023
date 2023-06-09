"use strict";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


//Scroll

function reveal() {
var reveals = document.querySelectorAll(".reveal");

for (var i = 0; i < reveals.length; i++) {
  var windowHeight = window.innerHeight;
  var elementTop = reveals[i].getBoundingClientRect().top;
  var elementVisible = 150;

  if (elementTop < windowHeight - elementVisible) {
    reveals[i].classList.add("active");
  } else {
    reveals[i].classList.remove("active");
  }
}
}

window.addEventListener("scroll", reveal);

/* Burger */
document.addEventListener('DOMContentLoaded', initNav);
function initNav() {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.main-nav');
  burger.addEventListener('click', () => {
    nav.classList.toggle('show');
  });
}

//Seulement index.html
if (window.location.pathname === "/index.html" || window.location.pathname === "https://nicolascoopman.be/projets/tfa/index.html") {
//Compteur 
  const counterElement = document.getElementById("counter");
  const targetCount = 660000;
  let currentCount = 0;

  function isElementInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
  }

  function updateCounter() {
      counterElement.innerText = currentCount.toLocaleString();

      if (currentCount < targetCount) {
          currentCount += 800;
          setTimeout(updateCounter, 1);
      } else {
          currentCount = targetCount;
      }
  }

  function updateCounterOnScroll() {
      if (isElementInViewport(counterElement)) {
          updateCounter();
          window.removeEventListener('scroll', updateCounterOnScroll);
      }
  }

  window.addEventListener('scroll', updateCounterOnScroll);

  
//Slider

const btnPrev = document.querySelector(".slider__btn--prev"),
btnNext = document.querySelector(".slider__btn--next"),
arrowPrev = document.querySelector(".slider__arrow--left"),
arrowNext = document.querySelector(".slider__arrow--right");


btnNext.addEventListener("click", next);
btnPrev.addEventListener("click", prev);
arrowNext.addEventListener("click", next);
arrowPrev.addEventListener("click", prev);

function next (){
let elShow = document.querySelector(".slider__el--show"),
  elNext = elShow.nextElementSibling;

  elShow.classList.remove("slider__el--show");

  if(elNext){
      elNext.classList.add("slider__el--show");
  }else{
      let elFirst = elShow.parentNode.firstElementChild;
      elFirst.classList.add("slider__el--show");
  }

}

function prev(){
let elShow = document.querySelector(".slider__el--show"),
  elPrev = elShow.previousElementSibling;

  elShow.classList.remove("slider__el--show");

  if(elPrev){
      elPrev.classList.add("slider__el--show");
  }else{
      let elLast = elShow.parentNode.lastElementChild;
      elLast.classList.add("slider__el--show");
  }

}


  //Hammer (swipe sur le slider)
  const slider = document.querySelector(".slider"),
  hammerSlider = new Hammer(slider);

  hammerSlider.on("swipeleft", next);
  hammerSlider.on("swiperight", prev);
}

//fleche 

var animation = bodymovin.loadAnimation({
  container: document.querySelector('.anim'),
  renderer: 'svg',
  autoplay: true,
  path: 'https://assets3.lottiefiles.com/packages/lf20_muyl0kpg.json'
})

animation.setSpeed(0.65);



//Touches clavier
document.addEventListener("keydown", function(e){
    if(e.code == "ArrowLeft"){
        prev();
    }else if(e.code == "ArrowRight"){
        next();
    }
});

// Copyright
let year = new Date().getFullYear();
let date = document.querySelector("#date");
date.innerHTML = "©SpikeZ"+ String(year);

// Menu déroulant

window.onload = function() {
  var toggleTitres = document.querySelectorAll('.toggle-titre');
  toggleTitres.forEach(function(titre) {
    titre.addEventListener('click', toggleContenu);
  });
};

function toggleContenu() {
  var contentId = this.getAttribute('id').replace('toggle-titre', 'toggle-contenu');
  var toggleContenu = document.getElementById(contentId);
  toggleContenu.classList.toggle('active');
  this.querySelector('.arrow').classList.toggle('rotate-down');

  toggleContenu.addEventListener('click', function() {
    toggleContenu.classList.remove('active');
    titre.querySelector('.arrow').classList.remove('rotate-down');
  });
}

//Retour à l'endroit d'ou on quitté la page
if (typeof(Storage) !== "undefined") {
  if (sessionStorage.getItem("scrollPosition")) {
    var scrollPosition = sessionStorage.getItem("scrollPosition");
    window.scrollTo(0, scrollPosition);
    sessionStorage.removeItem("scrollPosition");
  }

  window.addEventListener("beforeunload", function() {
    sessionStorage.setItem("scrollPosition", window.pageYOffset);
  });
}

