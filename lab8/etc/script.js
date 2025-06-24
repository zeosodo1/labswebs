class Slider {
    constructor(config) {
      this.images = config.images || [];
      this.duration = config.duration || 500;
      this.autoplay = config.autoplay || false;
      this.showArrows = config.showArrows !== undefined ? config.showArrows : true;
      this.showPagination = config.showPagination !== undefined ? config.showPagination : true;
      this.slider = document.getElementById('slider');
      this.sliderContent = this.slider.querySelector('.slider-content');
      this.prevButton = document.getElementById('prev');
      this.nextButton = document.getElementById('next');
      this.paginationContainer = document.getElementById('pagination');
      this.currentIndex = 0;
      this.timer = null;
      this.init();
    }
  
init() {
    this.renderPagination();
    this.addEventListeners();
    if (this.autoplay) {
    this.startAutoplay();
    }
    this.updateSlider();
}

renderPagination() {
    if (this.showPagination) {
    this.paginationContainer.innerHTML = '';
    this.images.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.addEventListener('click', () => this.goToSlide(index));
        this.paginationContainer.appendChild(dot);
    });
    }
}

addEventListeners() {
    this.prevButton.addEventListener('click', () => this.prevSlide());
    this.nextButton.addEventListener('click', () => this.nextSlide());
    document.addEventListener('keydown', (e) => this.handleKeyboardEvents(e));
    if (this.autoplay) {
    this.slider.addEventListener('mouseenter', () => this.stopAutoplay());
    this.slider.addEventListener('mouseleave', () => this.startAutoplay());
    }
}

handleKeyboardEvents(e) {
    if (e.key === 'ArrowLeft') {
    this.prevSlide();
    } else if (e.key === 'ArrowRight') {
    this.nextSlide();
    }
}

prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateSlider();
}

nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateSlider();
}

goToSlide(index) {
    this.currentIndex = index;
    this.updateSlider();
}

updateSlider() {
    const offset = -this.currentIndex * 100;
    this.sliderContent.style.transform = `translateX(${offset}%)`;
    this.updatePagination();
}

updatePagination() {
    const dots = this.paginationContainer.querySelectorAll('div');
    dots.forEach((dot, index) => {
    dot.classList.remove('active');
    if (index === this.currentIndex) {
        dot.classList.add('active');
    }
    });
}

startAutoplay() {
    this.timer = setInterval(() => this.nextSlide(), 3000);
}

stopAutoplay() {
    if (this.timer) {
    clearInterval(this.timer);
    this.timer = null;
    }
}
}

const slider = new Slider({
images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
duration: 500,
autoplay: true,
showArrows: true,
showPagination: true
});
