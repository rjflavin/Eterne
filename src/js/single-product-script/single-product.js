import {addToCart} from "../utils/cart-handler";
import { checkParentsForClass } from "../utils/check-parents-for-class";

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

    this.productDetailsHandler = (dataAttribute) => {
      const productSizeAndFitElement = this.querySelector(`[${dataAttribute}]`);
      const productSizeAndFitHeaderElement = productSizeAndFitElement.querySelector('.product-details__header');
      const productSizeAndFitContentElement = productSizeAndFitElement.querySelector('.product-details__content');
      const plusButtonElement = productSizeAndFitHeaderElement.querySelector('[data-plus-button]');
      const minusButtonElement = productSizeAndFitHeaderElement.querySelector('[data-minus-button]');

      if (productSizeAndFitHeaderElement && productSizeAndFitContentElement) {
        productSizeAndFitHeaderElement.addEventListener('click', () => {
          const isOpen = productSizeAndFitContentElement.classList.contains('disp-flx-imp');

          if (isOpen) {
            productSizeAndFitContentElement.classList.remove('disp-flx-imp');
            plusButtonElement?.classList.remove('disp-none-imp');
            minusButtonElement?.classList.add('disp-none-imp');
          } else {
            productSizeAndFitContentElement.classList.add('disp-flx-imp');
            plusButtonElement?.classList.add('disp-none-imp');
            minusButtonElement?.classList.remove('disp-none-imp');
          }
        });
      }
    }
  }

  connectedCallback() {
    document.addEventListener('DOMContentLoaded', () => {
      this.initializeOptionSelectors();
      this.showDefaultColorImages();
      /*this.initializeColorSwatchHover();*/
      /*this.initializeProductMediaHover();*/
      this.watchProductsClickTarget();
      this.setTitleForColorSwatches();
      this.initializeProductDetailsToggle();
      this.initializeSizeInfoToggle();
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
    const productMediaItemsDesktopElements = this.querySelectorAll('.product-media-collage__item');

    productMediaItemsDesktopElements.forEach(item => {
      const img = item.querySelector('img');
      if (img && img.alt.toLowerCase() === selectedColor.toLowerCase()) {
        item.style.display = 'block';
        item.classList.add('is-active');
      } else {
        item.style.display = 'none';
        item.classList.remove('is-active');
      }
    });

    const allMobileImagesForProductSliderContainerElement = document.querySelector('[data-mobile-siler-all-images]');
    const allMobileImagesForProductSliderElements = allMobileImagesForProductSliderContainerElement.querySelectorAll('img');
    const mobileProductSliderWrapperElement = this.querySelector('.product-slider__swiper-wrapper');
    const mobileProductSliderWrapperImagesElements = mobileProductSliderWrapperElement.querySelectorAll('img');

    mobileProductSliderWrapperImagesElements.forEach((imageElement) => imageElement.remove());
    let index = 0;
    allMobileImagesForProductSliderElements.forEach((imageElement) => {
      if (imageElement.dataset.colorName === selectedColor.toLowerCase()) {
        const imageElementClone = imageElement.cloneNode();
        imageElementClone.dataset.swiperSlideIndex = String(index);
        index = index + 1;
        mobileProductSliderWrapperElement.append(imageElementClone);
      }
    });

    document.dispatchEvent(new CustomEvent('productMobileSlidesUpdated'));
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

  setTitleForColorSwatches () {
    const colorSwatchesElements = this.querySelectorAll('.opt-label--swatch');

    if (colorSwatchesElements) {
      colorSwatchesElements.forEach((colorSwatchesElement) => {
        const color = colorSwatchesElement.dataset.swatch.toUpperCase();
        colorSwatchesElement.setAttribute('title', color);
      });
    }
  }

  /*initializeColorSwatchHover() {
    const swatchLabels = document.querySelectorAll('.opt-label--swatch');
    swatchLabels.forEach(label => {
      label.addEventListener('mouseenter', this.showTooltip);
      label.addEventListener('mouseleave', this.hideTooltip);
    });
  }

  showTooltip(event) {
    const label = event.currentTarget;
    const colorName = label.getAttribute('data-swatch');
    let tooltip = label.querySelector('.color-tooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.className = 'color-tooltip';
      tooltip.textContent = colorName.replace(/_/g, ' ').toUpperCase();
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
  }*/

  /*initializeProductMediaHover() {
    const productMediaItems = this.querySelectorAll('.product-media--image');
    productMediaItems.forEach(item => {
      item.addEventListener('mouseenter', this.handleMediaHover.bind(this));
      item.addEventListener('mouseleave', this.handleMediaMouseLeave.bind(this));
    });
  }*/

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
    this.productDetailsHandler('data-product-details');
  }

  initializeSizeInfoToggle() {
    this.productDetailsHandler('data-product-size-and-info');
  }

  watchProductsClickTargetHandler(event) {
    const productElement = event.target.closest('.product');
    const isClickOnMobileQuickAddShowButton = checkParentsForClass(event.target, 'product__item-quick-add-btn-wrap');

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
          const variantId = selectedVariantElement.dataset.variantId;
          const addToCart = async () => {
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
            addToCart();
          } else {
            console.error("Variant ID not found. Ensure that the size variant has a valid ID.");
          }
        } else {
          console.error("No size variant selected. Please select a size before adding to the cart.");
        }
      }
    }

    if (isClickOnMobileQuickAddShowButton) {
      const recommendedProductCardElement = event.target.closest('[data-product-id]');
      const quickAddPanelElement = recommendedProductCardElement.querySelector('[data-quick-add-panel]');
      const quickAddMobileButtonElement = recommendedProductCardElement.querySelector('[data-quick-add-button]');
      quickAddPanelElement.classList.add('product__quick-add-panel_show-mobile');
      quickAddMobileButtonElement.classList.add('disp-none-imp');
    } else {
      const quickAddPanelsElements = this.querySelectorAll('[data-quick-add-panel]');
      const quickAddMobileButtonElements = this.querySelectorAll('[data-quick-add-button]');

      quickAddPanelsElements.forEach((panelElement) => {
        panelElement.classList.remove('product__quick-add-panel_show-mobile');
      });

      quickAddMobileButtonElements.forEach((quickAddMobileButtonElement) => {
        quickAddMobileButtonElement.classList.remove('disp-none-imp');
      });
    }
  }

  watchProductsClickTarget() {
    const productsContainer = document.querySelector('.product-recommendations');
    if (productsContainer) {
      productsContainer.addEventListener('click', this.watchProductsClickTargetHandler);
    } else {
      console.error("productsContainer element not found. Ensure that the .product-recommendations element exists in the HTML.");
    }

    this.addEventListener('click', this.watchProductsClickTargetHandler);
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
