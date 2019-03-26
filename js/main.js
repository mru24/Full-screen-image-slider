const slides = document.querySelectorAll('.slide');
const content = document.querySelectorAll('.content');

const next = document.querySelector('#next');
const prev = document.querySelector('#prev');

const autoSlider = document.querySelector('#autoSlider');

let auto = false;

const intervalTime = 7000;
let slideInterval;

const nextSlide = () => {
  // Get active silde
  const active = document.querySelector('.active');
  // Remove active class
  active.classList.remove('active');
  // Check for next slide
  if(active.nextElementSibling) {
  // Add active class to next sibling
    active.nextElementSibling.classList.add('active');
  } else {
  // Add active class to first slide
    slides[0].classList.add('active');
  }
  setTimeout(() => active.classList.remove('active'));
}

const prevSlide = () => {
  // Get active slide
  const active = document.querySelector('.active')
  // Remove active class
  active.classList.remove('active')
  // Check for prev slide
  if(active.previousElementSibling) {
  // Add active class to prev slide
    active.previousElementSibling.classList.add('active');
  } else {
  // Add active class to last slide
    slides[slides.length - 1].classList.add('active');
  }
  setTimeout(() => active.classList.remove('active'));
}

next.addEventListener('click', e => {
  nextSlide();
  if(auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }
})

prev.addEventListener('click', e => {
  prevSlide();
  if(auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(prevSlide, intervalTime);
  }
})

// Auto slider
if(auto) {
  slideInterval = setInterval(nextSlide, intervalTime);
}

// Play/Pause button
autoSlider.addEventListener('click', e => {
  auto = !auto;
  if(auto) {
    slideInterval = setInterval(nextSlide, intervalTime);
    autoSlider.innerHTML = '<i class="fas fa-play"></i>';
  } else {
    clearInterval(slideInterval);
    auto = false;
    autoSlider.innerHTML = '<i class="fas fa-pause"></i>';
  }
})

// Content hover - slider pause

for (var i = 0; i < content.length; i++) {
  content[i].addEventListener('mouseover', e => {
    clearInterval(slideInterval);
    auto = false;
    autoSlider.innerHTML = '<i class="fas fa-pause"></i>';
  });
  content[i].addEventListener('mouseout', e => {
    auto = true;
    slideInterval = setInterval(nextSlide, intervalTime);
    autoSlider.innerHTML = '<i class="fas fa-play"></i>';
  });
}
