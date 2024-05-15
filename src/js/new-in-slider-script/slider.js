import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';

Swiper.use([Navigation]);

document.addEventListener("DOMContentLoaded", () => {
  const slider = new Swiper('.new-in__swiper', {
    breakpoints: {
      768: {
        slidesPerView: 5,
        slidesPerGroup: 1,
      }
    },
    direction: "horizontal",
    keyboard: {
      enabled: true,
    },
    modules: [Navigation],
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    slidesPerView: 2.6,
    slidesPerGroup: 1,
    spaceBetween: 0,
    watchOverflow: true,
  });
});
