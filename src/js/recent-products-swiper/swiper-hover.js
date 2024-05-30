import { addToCartSetup } from "../utils/cart-handler";

document.addEventListener("DOMContentLoaded", () => {
    const recentProductsItems = document.querySelectorAll('.recent-products-slider-item')

    recentProductsItems.forEach((item) => {
        const mouseHoverIn = ((item) => {
            const infoContainer = item.querySelector('.swiper-slide-image-info')
            if (infoContainer) {
                infoContainer.classList.add('show')
            }

            const itemImage = item.querySelector('.swiper-slide-image')
            const secondImage = item.querySelector('.recent-products-swiper-second-image')
            if (itemImage && secondImage && secondImage.value && secondImage.value !== 'undefined') {
                itemImage.style.backgroundImage = "url('" + secondImage.value + "')"
            }

            const itemInfoButton = item.querySelector('.swiper-slide-image-info-button')
            if (itemInfoButton) {
                itemInfoButton.classList.add('hide')
            }
        })

        item.addEventListener('mouseover', () => {
            mouseHoverIn(item)
        });

        item.addEventListener('mouseenter', () => {
            mouseHoverIn(item)
        });

        item.addEventListener('mouseout', () => {
            const infoContainer = item.querySelector('.swiper-slide-image-info')
            if (infoContainer) {
                infoContainer.classList.remove('show')
            }

            const itemImage = item.querySelector('.swiper-slide-image')
            const firstImage = item.querySelector('.recent-products-swiper-first-image')
            if (itemImage && firstImage && firstImage.value && firstImage.value !== 'undefined') {
                itemImage.style.backgroundImage = "url('" + firstImage.value + "')"
            }
        });

        item.addEventListener('mouseleave', () => {
            const itemInfoButton = item.querySelector('.swiper-slide-image-info-button')
            if (itemInfoButton) {
                itemInfoButton.classList.remove('hide')
            }
        });

        const cartButtonElement = item.querySelector('.swiper-slide-image-info-cart-button')
        const loaderElement = item.querySelector('.swiper-slide-image-info-cart-loader')
        if (item.id && cartButtonElement && loaderElement) {
            addToCartSetup(cartButtonElement, item.id, 1, loaderElement)
        }

        const itemInfoButton = item.querySelector('.swiper-slide-image-info-button')
        if (itemInfoButton) {
            itemInfoButton.addEventListener('click', (event) => {
                event.preventDefault()
                const infoContainer = item.querySelector('.swiper-slide-image-info')
                if (infoContainer) {
                    infoContainer.classList.add('show')
                    itemInfoButton.classList.add('hide')
                }
            })
        }
    });
})
