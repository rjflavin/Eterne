import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';

Swiper.use([Navigation]);
document.addEventListener("DOMContentLoaded", () => {
  const recentlyViewedProductsSlider = new Swiper('.recent-products-swiper', {
    allowTouchMove: true,
    loop: true,
    modules: [Navigation],
    navigation: {
      nextEl: ".recent-products-swiper-button-next",
      prevEl: ".recent-products-swiper-button-prev"
    },
    slidesPerView: 1,
    spaceBetween: 0,
    watchSlidesVisibility: true,
    slideClass: 'recent-products__slider-slide',
    wrapperClass: 'recent-products__swiper-wrapper',
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      375: {
        slidesPerView: 1.5,
      },
      460: {
        slidesPerView: 1.7,
      },
      576: {
        slidesPerView: 2.2,
      },
      620: {
        slidesPerView: 2.5,
      },
      690: {
        slidesPerView: 2.8,
      },
      768: {
        slidesPerView: 3,
      },
      900: {
        slidesPerView: 3.6,
      },
      1024: {
        slidesPerView: 4,
      }
    },
  });
});
