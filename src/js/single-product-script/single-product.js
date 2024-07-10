import {checkParentsForClass} from "../utils/check-parents-for-class";
import {addToCart} from "../utils/cart-handler";

export default class SingleProduct extends HTMLElement {
  constructor() {
    super();
    this.product = {
      variants: window.productData.variants,
      options: window.productData.options
    };
    this.sectionId = this.getAttribute('section-id');

    this.productDetailsHandler = (dataAttribute) => {
    const productSizeAndFitElement = this.querySelector(`[${dataAttribute}]`);

    if (productSizeAndFitElement) {
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
  }

  connectedCallback() {
    document.addEventListener('DOMContentLoaded', () => {
      this.initializeOptionSelectors();
      this.watchScroll();
      this.setTitleForColorSwatches();
      this.initializeProductDetailsToggle();
      this.initializeSizeInfoToggle();
    });
    document.addEventListener('variant:change', this.handleVariantChange.bind(this));
  }

  watchScroll () {
    let lastScrollTop = 157.73;

    window.addEventListener('scroll', () => {
      const stickyContent = document.querySelector('[data-sticky-content-container]');
      const productColumnRight = document.querySelector('.product-column-right');
      const offset = productColumnRight.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (stickyContent) {
        const stickyHeight = stickyContent.offsetHeight;
        const topOffset = offset.top - stickyHeight + windowHeight;
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScrollTop > lastScrollTop) {
          if (window.pageYOffset >= topOffset && stickyHeight > windowHeight) {
            stickyContent.style.top = `${windowHeight - stickyHeight - 40}px`;
          } else if (window.pageYOffset >= topOffset) {
            stickyContent.style.top = '40px';
          }
        } else {
          if (window.pageYOffset < offset.top) {
            stickyContent.style.top = '157.73px';
          } else {
            const topPosition = Math.min(157.73, parseInt(stickyContent.style.top) + (lastScrollTop - currentScrollTop));
            stickyContent.style.top = `${topPosition}px`;
          }
        }

        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
      }
    });
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
      this.updateProduct(variant, selectedColor);
    }
  }

  handleVariantChange(event) {
    const variant = event.detail.variant;
    const selectedColor = variant.options.find(option => option.toLowerCase() === 'color');
    this.updateProduct(variant, selectedColor);
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

  updateProduct(variant, selectedColor) {
    this.updateProductPrice(variant.price);
    this.updateProductAvailability(variant.available);
    this.updateSelectedVariantLayout(selectedColor);
    this.updateRecommendedProducts(selectedColor);
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

  updateSelectedVariantLayout(selectedColorParam) {
    const selectedColor = selectedColorParam.toLowerCase();
    const activeClass = 'product-media-collage--active'
    const activeColorWrappers = this.querySelectorAll(`[data-color-images-wrapper].${activeClass}`);
    activeColorWrappers.forEach((activeColorWrapper) => {

      if (activeColorWrapper.dataset.colorImagesWrapper !== selectedColor) {
        activeColorWrapper.classList.remove(activeClass);
        const newActiveColorWrappers = this.querySelectorAll(`[data-color-images-wrapper="${selectedColor}"]`);
        if (newActiveColorWrappers.length > 0) {
          newActiveColorWrappers.forEach((newActiveColorWrapper) => {
            newActiveColorWrapper.classList.add(activeClass);
          })
        }
      }
    })
  }

  updateRecommendedProducts(selectedColorParam) {
    const selectedColor = selectedColorParam.toLowerCase();
    const activeClass = 'recommendations-grid--active';
    const recommendProductsWrappers = this.querySelectorAll('.product-recommendations [data-rec-products]');
    recommendProductsWrappers.forEach((recommendedWrapper) => {
      const wrapperColor = recommendedWrapper.dataset.recProductsColor.toLowerCase();
      if (wrapperColor !== selectedColor && recommendedWrapper.classList.contains(activeClass)) {
        recommendedWrapper.classList.remove(activeClass);
      } else if (wrapperColor === selectedColor) {
        recommendedWrapper.classList.add(activeClass);
      }
    })
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

  initializeProductDetailsToggle() {
    this.productDetailsHandler('data-product-details');
  }

  initializeSizeInfoToggle() {
    this.productDetailsHandler('data-product-size-and-info');
  }
}
