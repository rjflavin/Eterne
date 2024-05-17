const productElements = document.querySelectorAll('.collection__item-inner');

productElements.forEach((slideElement) => {
  slideElement.addEventListener('mouseenter', () => {
    slideElement.querySelector('[data-hover-image]').classList.add('disp-flx-imp');
  });

  slideElement.addEventListener('mouseout', () => {
    slideElement.querySelector('[data-hover-image]').classList.remove('disp-flx-imp');
  });
});
