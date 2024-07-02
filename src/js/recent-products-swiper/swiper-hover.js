import { addToCartSetup } from "../utils/cart-handler";
import { getSiblings } from "../utils/get-sibling-elements";

document.addEventListener("DOMContentLoaded", () => {
    const recentProductsItems = document.querySelectorAll('.recent-products__slider-slide');

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

        function checkPreorder(event = null) {
            const selectesSize = (event) ? event.target : item.querySelector('[data-size-item].selected-size');
            const isPreordered = selectesSize.dataset.isPreordered;
            const buttonOrder = item.querySelector('.preorder-button');
            const seeMoreButton = item.querySelector('[data-see-more-preordered]');
            const quickAddButton = item.querySelector('[data-quick-add]');

            if (isPreordered === 'true') {
                buttonOrder.classList.remove('disp-none-imp');
                seeMoreButton.classList.remove('disp-none-imp');
                quickAddButton.classList.add('disp-none-imp');
            } else {
                buttonOrder.classList.add('disp-none-imp');
                seeMoreButton.classList.add('disp-none-imp');
                quickAddButton.classList.remove('disp-none-imp');
            }
        }

        checkPreorder();

        const currentPriceElem = item.querySelector('[data-current-price]');

        item.querySelectorAll('[data-size-item]').forEach((sizeElem) => {
            const activeClass = 'selected-size'
            sizeElem.addEventListener('click', (e) => {
                const siblingSizes = getSiblings(e.target)
                item.setAttribute('data-active-variant', sizeElem.dataset.sizeItem)
                e.target.classList.add(activeClass);
                checkPreorder(e);
                siblingSizes.forEach((siblingSize) => {
                    if (siblingSize.classList.contains(activeClass))
                        siblingSize.classList.remove(activeClass)
                })
                currentPriceElem.innerHTML = sizeElem.dataset.price
            })
        })

        const cartButtonElement = item.querySelector('[data-quick-add]')
        if (cartButtonElement) {
            cartButtonElement.addEventListener('click', () => {
                const loaderElement = item.querySelector('.swiper-slide-image-info-cart-loader')
                const loaderFillTextElement = item.querySelector('.swiper-slide-image-info-cart-loader-fill-text')
                const activeVariant = document.getElementById(item.id)
                addToCartSetup(cartButtonElement, activeVariant.dataset.activeVariant, 1, loaderElement, loaderFillTextElement)
            })
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
