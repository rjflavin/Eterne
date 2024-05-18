import addToCartSetup from "../utils/add-to-cart-handler";

document.addEventListener("DOMContentLoaded", () => {
    const recentProductsItems = document.querySelectorAll('.recent-products-slider-item')

    recentProductsItems.forEach((item) => {
        item.addEventListener('mouseover', () => {
            const infoContainer = item.querySelector('.swiper-slide-image-info')
            if (infoContainer) {
                infoContainer.classList.add('show')
            }
        });

        item.addEventListener('mouseout', () => {
            const infoContainer = item.querySelector('.swiper-slide-image-info')
            if (infoContainer) {
                infoContainer.classList.remove('show')
            }
        });

        const cartButtonElement = item.querySelector('.swiper-slide-image-info-cart-button')
        if (item.id && cartButtonElement) {
            addToCartSetup(cartButtonElement, item.id, 1)
        }
    });
})
