import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';

Swiper.use([Navigation]);
document.addEventListener("DOMContentLoaded", () => {
  const slider = new Swiper('.cart-flyover-you-may-also-like-swiper', {
    allowTouchMove: true,
    loop: true,
    modules: [Navigation],
    navigation: {
      nextEl: ".cart-flyover-you-may-also-like-swiper__button-next",
      prevEl: ".cart-flyover-you-may-also-like-swiper__button-prev"
    },
    slidesPerView: 1,
    spaceBetween: 0,
    watchSlidesVisibility: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      375: {
        slidesPerView: 1.55,
      },
      768: {
        slidesPerView: 2
      }
    },
  });
});
