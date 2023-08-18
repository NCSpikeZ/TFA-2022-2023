"use strict";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
gsap.registerPlugin(ScrollTrigger);

// Bar de progression du site
document.addEventListener('scroll', function() {
  const windowHeight = window.innerHeight;
  const documentHeight = document.body.clientHeight;
  const scrollPosition = window.scrollY;

  const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100;

  const progressBar = document.querySelector('.progress-container_bar');
  progressBar.style.width = scrollPercentage + '%';
});

/* Burger */
document.addEventListener('DOMContentLoaded', initNav);
function initNav() {
  const burger = document.querySelector('.main-nav_burger');
  const nav = document.querySelector('.main-nav');
  burger.addEventListener('click', () => {
    nav.classList.toggle('show');
  });
}

//Animation
AOS.init();

//Seulement index.html
if (window.location.href === "https://nicolascoopman.be/projets/tfaaout/" || window.location.href === "https://nicolascoopman.be/projets/tfaaout/#scroll" || window.location.href === "https://nicolascoopman.be/projets/tfaaout/index.html" || window.location.href === "https://nicolascoopman.be/projets/tfaaout/index.html#scroll" || window.location.href === "http://nicolascoopman.be/projets/tfaaout/" || window.location.href === "http://nicolascoopman.be/projets/tfaaout/index.html" ||window.location.href === "http://nicolascoopman.be/projets/tfaaout/#scroll " || window.location.href === "http://nicolascoopman.be/projets/tfaaout/index.html#scroll" || window.location.pathname === "/index.html") {
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

// Slider
const slider = document.querySelector('.slider');
const indicators = document.querySelectorAll('.indicators__indicator');
const images = document.querySelectorAll('.slider__content');
const leftArrow = document.querySelector('.navigation__arrow--left');
const rightArrow = document.querySelector('.navigation__arrow--right');

let currentSlide = 0;
let touchStartX = 0;
let touchEndX = 0;

function updateIndicators() {
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentSlide);
  });
}

function changeSlide(index) {
  currentSlide = (index + images.length) % images.length;
  const translateValue = -currentSlide * 100;
  slider.style.transform = `translateX(${translateValue}%)`;
  updateIndicators();
}

function handleSwipe() {
  const swipeDistance = touchEndX - touchStartX;
  if (swipeDistance > 50) {
    changeSlide(currentSlide - 1);
  } else if (swipeDistance < -50) {
    changeSlide(currentSlide + 1);
  }
}

function goToNextSlide() {
  changeSlide(currentSlide + 1);
}

function goToPreviousSlide() {
  changeSlide(currentSlide - 1);
}

indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', () => {
    changeSlide(index);
  });
});

slider.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});

slider.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].clientX;
  handleSwipe();
});

images.forEach((image) => {
  image.addEventListener('click', goToNextSlide);
});

leftArrow.addEventListener('click', goToPreviousSlide);
rightArrow.addEventListener('click', goToNextSlide);

updateIndicators();

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
}

//Oeil

const oeil = document.querySelector('.oeil');
const pupille = document.querySelector('.pupille');

document.addEventListener('mousemove', (event) => {
  const oeilRect = oeil.getBoundingClientRect();
  const oeilCenterX = oeilRect.left + oeilRect.width / 2;
  const oeilCenterY = oeilRect.top + oeilRect.height / 2;

  const mouseX = event.clientX;
  const mouseY = event.clientY;

  const deltaX = mouseX - oeilCenterX;
  const deltaY = mouseY - oeilCenterY;
  const angle = Math.atan2(deltaY, deltaX);

  const maxDistance = oeilRect.width * 0.25;
  const distance = Math.min(maxDistance, Math.hypot(deltaX, deltaY));

  const pupilleX = oeilCenterX + distance * Math.cos(angle);
  const pupilleY = oeilCenterY + distance * Math.sin(angle);

  pupille.style.left = `${pupilleX - oeilRect.left}px`;
  pupille.style.top = `${pupilleY - oeilRect.top}px`;
});