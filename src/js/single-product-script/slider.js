import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';

Swiper.use([Navigation]);

document.addEventListener("DOMContentLoaded", () => {
  const productMobileSlider = new Swiper('.product-slider__swiper', {
    allowTouchMove: true,
    loop: true,
    modules: [Navigation],
    navigation: {
      nextEl: ".product-slider__arrow-next",
      prevEl: ".product-slider__arrow-prev"
    },
    slidesPerView: 1,
    spaceBetween: 0,
    watchSlidesVisibility: true,
    slideClass: 'product-slider__slide',
    wrapperClass: 'product-slider__swiper-wrapper',
  });

  document.addEventListener("productMobileSlidesUpdated", () => {
    productMobileSlider.update();
  });
});
