"use strict";

/* Burger */
document.addEventListener('DOMContentLoaded', initNav);
function initNav() {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.main-nav');
  burger.addEventListener('click', () => {
    nav.classList.toggle('show');
  });
}

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
    currentCount += 1000;
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