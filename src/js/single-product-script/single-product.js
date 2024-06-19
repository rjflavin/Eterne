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
      this.watchShowMore();
      this.watchRecommendedQuickAdd();
      this.setTitleForColorSwatches();
      this.initializeProductDetailsToggle();
      this.initializeSizeInfoToggle();
    });

    this.querySelectorAll('.product-recommendations [name="recommended-product-size"]').forEach((sizeElem) => {
      sizeElem.addEventListener('change', (e) => {
        e.preventDefault();
        const activeLabelClass = 'product__size-label--checked';
        const activeInputClass = 'product__size-item--checked';
        const targetLabel = this.querySelector(`label[for="${sizeElem.id}"]`);
        const targetInput = e.target;

        const oldSelectedSize = sizeElem.closest('.product__size-variants').querySelector(`.${activeLabelClass}`);

        const oldSelectedSizeInput = sizeElem.closest('.product__size-variants').querySelector(`.${activeInputClass}`);
        if (!targetInput.classList.contains(activeInputClass)) {
          targetLabel.classList.add(activeLabelClass);
          targetInput.classList.add(activeInputClass);
          oldSelectedSize.classList.remove(activeLabelClass);
          oldSelectedSizeInput.classList.remove(activeInputClass);
        }
      })
    })

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
    this.resetShowMoreFunctionality();
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

  watchShowMore() {
    const recommendationsList = this.querySelectorAll('.recommendations-list');
    recommendationsList.forEach((recommendationsWrapper) => {
      const showMoreBtn = recommendationsWrapper.closest('[data-rec-products]').querySelector('.show-more-btn');
      if (showMoreBtn) {
        showMoreBtn.addEventListener('click', this.watchShowMoreHandler.bind(this, recommendationsWrapper));
      }
    })
  }

  watchShowMoreHandler(recommendationsWrapper) {
    const hiddenProducts = recommendationsWrapper.querySelectorAll('.product.hidden');
    const showMoreBtn = recommendationsWrapper.closest('[data-rec-products]').querySelector('.show-more-btn');
    hiddenProducts.forEach((product, index) => {
      if (index < 2) {
        product.classList.remove('hidden');
      }
    });

    if (hiddenProducts.length <= 2 ) {
      showMoreBtn.style.display = 'none';
    }
  }

  watchRecommendedQuickAdd() {
    this.querySelectorAll('.product__add-to-cart').forEach((addRecommended) => {
      addRecommended.addEventListener('click', () => {
        const quickAddPanel = this.querySelector(`#${addRecommended.dataset.quickAddPanel}`);
        const sizeVariants = quickAddPanel.querySelectorAll('input');
        const selectedVariant = Array.from(sizeVariants).find((variantSize) =>  variantSize.classList.contains('product__size-item--checked'));
        if (selectedVariant) {
          const variantId = selectedVariant.dataset.variantId;
          const addToCartHendler = async () => {
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
            addToCartHendler();
          } else {
            console.error("Variant ID not found. Ensure that the size variant has a valid ID.");
          }
        } else {
          console.error("No size variant selected. Please select a size before adding to the cart.");
        }
      })
    })
  }

  resetShowMoreFunctionality () {
    const recommendationsList = this.querySelectorAll('.recommendations-list');
    recommendationsList.forEach((recommendationsWrapper) => {
      const products = recommendationsWrapper.querySelectorAll('.product');

      if (products.length > 2) {
        const showMoreBtn = recommendationsWrapper.closest('[data-rec-products]').querySelector('.show-more-btn');
        products.forEach((product, index) => {
          if (index >= 2) {
            product.classList.add('hidden');
          }
        });
        showMoreBtn.style.display = 'block';
      }
    })
  }
}
