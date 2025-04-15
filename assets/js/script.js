'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navLinks, "click", closeNavbar);



/**
 * header active when scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeElem = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", activeElem);







// Function to get the current date
function getCurrentDate() {
  const today = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return today.toLocaleDateString(undefined, options);
}

// Function to get the current location and temperature
function getCurrentLocationAndTemperature() {
  const tempBtn = document.getElementById('temp-btn');
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Use a geocoding API to convert latitude and longitude to a location name
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
          .then((response) => response.json())
          .then((data) => {
            const location = data.address.city || data.address.town || data.address.village || 'Unknown Location';

            // Fetch the temperature for the location
            fetchTemperature(location, tempBtn);
          })
          .catch(() => {
            tempBtn.innerHTML = `Location: Unable to fetch<br>Date: ${getCurrentDate()}`;
          });
      },
      () => {
        tempBtn.innerHTML = `Location: Permission Denied<br>Date: ${getCurrentDate()}`;
      }
    );
  } else {
    tempBtn.innerHTML = `Location: Not Supported<br>Date: ${getCurrentDate()}`;
  }
}

// Function to fetch the temperature
async function fetchTemperature(location, tempBtn) {
  const apiKey = 'f4b0b08f2d7b39a3efe15242414036c7'; // OpenWeather API Key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.main && data.main.temp) {
      tempBtn.innerHTML = `Location: ${location}<br>Date: ${getCurrentDate()}<br>🌡️ ${data.main.temp}°C`;
    } else {
      tempBtn.innerHTML = `Location: ${location}<br>Date: ${getCurrentDate()}<br>Temp Unavailable`;
    }
  } catch (error) {
    console.error("Error fetching temperature:", error);
    tempBtn.innerHTML = `Location: ${location}<br>Date: ${getCurrentDate()}<br>Error`;
  }
}

// Call the function to set the location, date, and temperature
getCurrentLocationAndTemperature();







// Image Slider Functionality
const sliderWrapper = document.querySelector('.slider-wrapper');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
const dots = document.querySelectorAll('.dot');

let currentSlide = 0;
const slideCount = slides.length;

function updateSlider() {
  sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
  
  // Update dots
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slideCount;
  updateSlider();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slideCount) % slideCount;
  updateSlider();
}

// Event listeners
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentSlide = index;
    updateSlider();
  });
});

// Auto slide
let slideInterval = setInterval(nextSlide, 4000);

// Pause on hover
sliderWrapper.addEventListener('mouseenter', () => {
  clearInterval(slideInterval);
});

sliderWrapper.addEventListener('mouseleave', () => {
  slideInterval = setInterval(nextSlide, 4000);
});







// Update date and time
function updateDateTime() {
  const now = new Date();
  
  // Format date
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateString = now.toLocaleDateString('en-US', options);
  
  // Format time
  const timeString = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  });
  
  // Update DOM
  document.getElementById('current-date').textContent = dateString;
  document.getElementById('current-time').textContent = timeString;
}

// Update immediately and then every second
updateDateTime();
setInterval(updateDateTime, 1000);







// Visitor count functionality
function updateVisitorCount() {
  // Get current count from localStorage or initialize to 0
  let count = localStorage.getItem('visitorCount') || 0;
  
  // Increment count
  count = parseInt(count) + 1;
  
  // Save to localStorage
  localStorage.setItem('visitorCount', count);
  
  // Update display
  document.getElementById('visitor-count').textContent = count;
}

// Update visitor count when page loads
updateVisitorCount();






