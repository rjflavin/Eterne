import { addToCart } from "../utils/cart-handler";

export default class SingleProduct extends HTMLElement {
    constructor() {
        super();
        this.product = {
            "variants": window.productData.variants,
            "options": window.productData.options
        };
        this.productId = window.productData.productId;
        this.availableColors = this.getAvailableColors();
        this.watchProductsClickTargetHandler = this.watchProductsClickTargetHandler.bind(this);
        document.addEventListener('DOMContentLoaded', this.watchProductsClickTarget.bind(this));
    }

    connectedCallback() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeOptionSelectors();
            this.showDefaultColorImages();
            this.initializeColorSwatchHover();
            this.initializeProductMediaHover();
            this.initializeProductDetailsToggle();
            this.initializeSizeInfoToggle(); // Added line
        });

        document.addEventListener('variant:change', this.handleVariantChange.bind(this));
    }

    getAvailableColors() {
        const colorLabels = document.querySelectorAll('.opt-label--swatch .js-value');
        return Array.from(colorLabels).map(label => label.textContent.toLowerCase());
    }

    initializeOptionSelectors() {
        const optionSelectors = this.querySelectorAll('.js-option');

        optionSelectors.forEach(selector => {
            selector.addEventListener('change', this.handleOptionChange.bind(this));
        });
    }

    handleOptionChange() {
        const selectedOptions = Array.from(this.querySelectorAll('.js-option:checked')).map(input => {
            const name = input.name.split('-option')[0].split('-').slice(-1)[0];
            return {
                name: name.charAt(0).toUpperCase() + name.slice(1),
                value: input.value
            };
        });

        const variant = this.findVariant(selectedOptions);
        const selectedColor = selectedOptions.find(option => option.name.toLowerCase() === 'color').value;

        if (variant) {
            this.updateProductDetails(variant, selectedColor);
        }
    }

    handleVariantChange(event) {
        const variant = event.detail.variant;
        const selectedColor = variant.options.find(option => option.toLowerCase() === 'color');
        this.updateProductDetails(variant, selectedColor);
    }

    findVariant(selectedOptions) {
        const variant = this.product.variants.find(variant => {
            return selectedOptions.every(option => {
                const optionIndex = this.product.options.indexOf(option.name);
                return variant.options[optionIndex] === option.value;
            });
        });
        return variant;
    }

    updateProductDetails(variant, selectedColor) {
        this.updateProductImage(selectedColor);
        this.updateProductPrice(variant.price);
        this.updateProductAvailability(variant.available);
    }

    updateProductImage(selectedColor) {
        const productMediaItems = this.querySelectorAll('.product-media-collage__item');

        productMediaItems.forEach(item => {
            const img = item.querySelector('img');
            if (img && img.alt.toLowerCase() === selectedColor.toLowerCase()) {
                item.style.display = 'block';
                item.classList.add('is-active');
            } else {
                item.style.display = 'none';
                item.classList.remove('is-active');
            }
        });
    }

    updateProductPrice(price) {
        const productPriceCurrentElement = this.querySelector('.price__current');

        if (productPriceCurrentElement) {
            productPriceCurrentElement.textContent = `$${(price / 100)}`;
        }
    }

    updateProductAvailability(available) {
        const productAvailabilityElement = this.querySelector('.product-availability');

        if (productAvailabilityElement) {
            productAvailabilityElement.textContent = available ? 'In Stock' : 'Out of Stock';
        }
    }

    showDefaultColorImages() {
        const defaultColorInput = this.querySelector('.js-option[name*="color-option"][checked]');
        if (defaultColorInput) {
            const defaultColor = defaultColorInput.value;
            this.updateProductImage(defaultColor);
        }
    }

    initializeColorSwatchHover() {
        const swatchLabels = document.querySelectorAll('.opt-label--swatch');
        swatchLabels.forEach(label => {
            label.addEventListener('mouseenter', this.showTooltip);
            label.addEventListener('mouseleave', this.hideTooltip);
        });
    }

    showTooltip(event) {
        const label = event.currentTarget;
        const colorName = label.querySelector('.js-value').textContent;
        let tooltip = label.querySelector('.color-tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.className = 'color-tooltip';
            tooltip.textContent = colorName;
            label.appendChild(tooltip);
        }
        tooltip.style.display = 'block';
    }

    hideTooltip(event) {
        const label = event.currentTarget;
        const tooltip = label.querySelector('.color-tooltip');
        if (tooltip) {
            tooltip.style.display = 'none';
        }
    }

    initializeProductMediaHover() {
        const productMediaItems = this.querySelectorAll('.product-media--image');
        productMediaItems.forEach(item => {
            item.addEventListener('mouseenter', this.handleMediaHover.bind(this));
            item.addEventListener('mouseleave', this.handleMediaMouseLeave.bind(this));
        });
    }

    handleMediaHover(event) {
        const item = event.currentTarget;
        const img = item.querySelector('img');
        if (img) {
            const currentAlt = img.alt.toLowerCase();
            const newAlt = this.getNewAlt(currentAlt);

            img.dataset.originalSrc = img.src;
            img.dataset.originalAlt = currentAlt;
            img.dataset.originalSrcset = img.srcset; // Store original srcset
            this.swapImage(item, newAlt);
        }
    }

    handleMediaMouseLeave(event) {
        const item = event.currentTarget;
        const img = item.querySelector('img');
        if (img) {
            img.src = img.dataset.originalSrc;
            img.alt = img.dataset.originalAlt;
            img.srcset = img.dataset.originalSrcset; // Restore original srcset
        }
    }

    swapImage(item, newAlt) {
        const productMediaItems = this.querySelectorAll('.product-media-collage__item');
        productMediaItems.forEach(mediaItem => {
            const img = mediaItem.querySelector('img');
            if (img && img.alt.toLowerCase() === newAlt.toLowerCase()) {
                const currentImg = item.querySelector('img');
                if (currentImg) {
                    currentImg.src = img.src;
                    currentImg.alt = img.alt;
                    currentImg.srcset = img.srcset; // Update srcset
                }
            }
        });
    }

    getNewAlt(currentAlt) {
        const currentIndex = this.availableColors.indexOf(currentAlt);
        return this.availableColors[currentIndex];
    }

    initializeProductDetailsToggle() {
        const productDetailsHeader = this.querySelector('.product-details');
        const productDetailsBlock = this.querySelector('.product-details-block');

        if (productDetailsHeader && productDetailsBlock) {
            productDetailsHeader.addEventListener('click', () => {
                const isOpen = productDetailsBlock.classList.toggle('open');
                productDetailsHeader.textContent = `Details ${isOpen ? '-' : '+'}`;
                productDetailsBlock.style.display = isOpen ? 'block' : 'none';
            });
        }
    }

    initializeSizeInfoToggle() {
        const productSizesHeader = this.querySelector('.product-sizes');
        const productSizesBlock = this.querySelector('.product-sizes-block');

        if (productSizesHeader && productSizesBlock) {
            productSizesHeader.addEventListener('click', () => {
                const isOpen = productSizesBlock.classList.toggle('open');
                productSizesHeader.textContent = `Size & Fit Information ${isOpen ? '-' : '+'}`;
                productSizesBlock.style.display = isOpen ? 'block' : 'none';
            });
        }
    }

    watchProductsClickTargetHandler(event) {
        const productElement = event.target.closest('.product');
        if (productElement) {
            const sizeVariantElement = event.target.closest('.product__size-variant-text.no-select');

            if (sizeVariantElement) {
                const clickedSize = sizeVariantElement.dataset.variantSize;

                const sizeVariants = productElement.querySelectorAll('.product__size-variant-text');
                sizeVariants.forEach(variant => {
                    variant.classList.remove('product__size-variant-text_selected');
                });

                sizeVariantElement.classList.add('product__size-variant-text_selected');
            }

            const addToCartButton = event.target.closest('.product__add-to-cart');
            if (addToCartButton) {
                const selectedVariantElement = productElement.querySelector('.product__size-variant-text_selected');
                if (selectedVariantElement) {
                    const variantId = selectedVariantElement.dataset.variandId;

                    const addToCartAndDisableLoader = async () => {
                        const response = await addToCart(variantId, 1);

                        if (response) {
                            const e = new CustomEvent("dispatch:cart-flyover:refresh", {
                                bubbles: true
                            })
                            document.dispatchEvent(e)

                            const event = new CustomEvent("dispatch:cart-drawer:open", {
                                bubbles: true
                            })
                            document.dispatchEvent(event)
                        }
                    }

                    if (variantId) {
                        addToCartAndDisableLoader();
                    } else {
                        console.error("Variant ID not found. Ensure that the size variant has a valid ID.");
                    }
                } else {
                    console.error("No size variant selected. Please select a size before adding to the cart.");
                }
            }
        }
    }

    watchProductsClickTarget() {
        const productsContainer = document.querySelector('.product-recommendations');
        if (productsContainer) {
            productsContainer.addEventListener('click', this.watchProductsClickTargetHandler);
        } else {
            console.error("productsContainer element not found. Ensure that the .product-recommendations element exists in the HTML.");
        }
    }

    async getProductInfo(productHandle) {
        try {
            const response = await fetch(`/products/${productHandle}.json`);
            if (response.ok) {
                const productData = await response.json();
                return productData.product;
            } else {
                console.error('Error fetching product data:', response.status);
            }
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
        return null;
    }
}
