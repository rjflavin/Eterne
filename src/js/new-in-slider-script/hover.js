const slideElements = document.querySelectorAll('.new-in__item-inner');

slideElements.forEach((slideElement) => {
  slideElement.addEventListener('mouseenter', () => {
    slideElement.querySelector('[data-hover-image]').classList.add('disp-flx-imp');
  });

  slideElement.addEventListener('mouseout', () => {
    slideElement.querySelector('[data-hover-image]').classList.remove('disp-flx-imp');
  });
});
