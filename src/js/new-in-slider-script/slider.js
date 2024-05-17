import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';

Swiper.use([Navigation]);

document.addEventListener("DOMContentLoaded", () => {
  const slider = new Swiper('.new-in__swiper', {
    allowTouchMove: true,
    loop: true,
    modules: [Navigation],
    navigation: {
      nextEl: ".new-in__arrow-next",
      prevEl: ".new-in__arrow-prev"
    },
    slidesPerView: 1,
    spaceBetween: 0,
    watchSlidesVisibility: true,
    breakpoints: {
      // when window width is >= 320
      320: {
        slidesPerView: 1.65,
      },

      // when window width is >= 480
      480: {
        slidesPerView: 2.65,
      },

      // when window width is >= 576
      576: {
        slidesPerView: 3.5,
      },

      // when window width is >= 768px
      768: {
        slidesPerView: 4,
        allowTouchMove: false
      },

      // when window width is >= 1024px
      1024: {
        slidesPerView: 5,
      }
    },
  });
});
