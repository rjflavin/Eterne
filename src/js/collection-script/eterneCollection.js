import { addToCart } from "../utils/cart-handler";
import { checkParentsForClass } from "../utils/check-parents-for-class";
import { debounce } from "../utils/debounce";

export class EterneCollection extends HTMLElement {
  constructor() {
    super();

    this._page2Content = "";
    this.filtersContainerElement = this.querySelector('.collection__filters');
    this.productsContainerElement = this.querySelector('.collection__products');
    this.seeMoreButtonElement = this.querySelector('[data-see-more-button]');
    this.seeMoreLoaderElement = this.querySelector('[data-see-more-loader]');
    this.filtersVisibilityToggle();
    this.watchProductsClickTarget();
    this.watchFiltersClickTarget();

    this.loadMoreProducts = () => {
      if (window.scrollY + window.innerHeight >= this.getProductsContainerScrollHeight() - this.getProductCardHeight() * 2) {
        const nextPageUrl = this.querySelector('[data-next-url]').dataset.nextUrl;

        if (nextPageUrl) {
          fetch(nextPageUrl, {
            method: 'GET',
            headers: {
              'Content-Type': 'text/html; charset=utf-8'
            }
          })
            .then((response) => response.text())
            .then((responseText) => {
              const newHtml = new DOMParser().parseFromString(responseText, 'text/html');
              const newNextUrl = newHtml.querySelector('[data-next-url]').dataset.nextUrl;
              const newProductsContainerElement = newHtml.querySelectorAll('[data-collection-item]');
              const newProductsDocumentFragment = document.createDocumentFragment();
              newProductsContainerElement.forEach((newProductElement) => {
                newProductsDocumentFragment.appendChild(newProductElement);
              });
              this.productsContainerElement.appendChild(newProductsDocumentFragment);

              if (newNextUrl) {
                this.productsContainerElement.dataset.nextUrl = newNextUrl;
              } else {
                this.productsContainerElement.dataset.nextUrl = '';
              }
            });
        }
      }
    };

    this.scrollDebounceHandler = debounce(() => {
      this.loadMoreProducts();
    }, 300);

    this.infiniteScrollProducts = () => {
      // insert page 2 products
      const textHtml = this._page2Content;
      this.productsContainerElement.insertAdjacentHTML("beforeend", textHtml);
      const newProductCardElements = this.productsContainerElement.querySelectorAll('[data-collection-item]');
      newProductCardElements.forEach((newProductCardElement) => {
        newProductCardElement.removeAttribute('xmlns');
      });
      this._page2Content = "";

      this.seeMoreButtonElement.classList.add('disp-none-imp');
      this.seeMoreLoaderElement.classList.add('disp-none-imp');

      window.addEventListener('scroll', this.scrollDebounceHandler);
    };

    this.loadProductsPage2 = () => {
      const nextPageUrl = this.querySelector('[data-next-url]').dataset.nextUrl;

      fetch(nextPageUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'text/html; charset=utf-8'
        }
      })
        .then((response) => response.text())
        .then((responseText) => {
          const newHtml = new DOMParser().parseFromString(responseText, 'text/html');
          const newNextUrl = newHtml.querySelector('[data-next-url]').dataset.nextUrl;
          const newProductsContainerElement = newHtml.querySelectorAll('[data-collection-item]');
          const newProductsDocumentFragment = document.createDocumentFragment();
          newProductsContainerElement.forEach((newProductElement) => {
            newProductsDocumentFragment.appendChild(newProductElement);
          });

          const serializer = new XMLSerializer();
          this._page2Content = serializer.serializeToString(newProductsDocumentFragment);

          if (newNextUrl) {
            this.productsContainerElement.dataset.nextUrl = newNextUrl;
          }

          const seeMoreLoaderElement = this.querySelector('[data-see-more-loader]');

          if (seeMoreLoaderElement && !seeMoreLoaderElement.classList.contains('disp-none-imp')) {
            this.infiniteScrollProducts();
          }
        });
    }

    this.seeMoreButtonHandler = (event) => {
      event.preventDefault();

      if (this._page2Content) {
        this.infiniteScrollProducts();
      } else {
        this.seeMoreButtonElement.classList.add('disp-none-imp');
        this.seeMoreLoaderElement.classList.remove('disp-none-imp');
      }
    };

    this.seeMore();

    document.addEventListener('collection-items-updated', () => {
      this.removeListeners();
      this._page2Content = "";
      this.filtersContainerElement = this.querySelector('.collection__filters');
      this.productsContainerElement = this.querySelector('.collection__products');
      this.seeMoreButtonElement = this.querySelector('[data-see-more-button]');
      this.seeMoreLoaderElement = this.querySelector('[data-see-more-loader]');
      this.addListeners();
    });
  }

  connectedCallback() {}

  getProductInfo = async (productHandle) => {
    let result;

    await fetch(window.Shopify.routes.root + `products/${productHandle}.js`)
      .then(response => {
        result = response.json();
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    return result;
  }

  getProductsContainerScrollHeight () {
    const productsContainerElements = this.querySelector('.collection__products');

    return productsContainerElements.scrollHeight;
  }

  getProductCardHeight () {
    const productElement = this.querySelector('[data-collection-item]');

    return productElement.scrollHeight;
  }

  filtersVisibilityToggle () {
    const filtersButtonElement = this.querySelector('.collection__filter-open-btn-wrap');

    filtersButtonElement.addEventListener('click', () => {
      const isFilterOpen = this.dataset.isFilterOpen === 'true';

      if (isFilterOpen) {
        this.dataset.isFilterOpen = 'false';
      } else {
        this.dataset.isFilterOpen = 'true';
      }
    });
  }

  watchProductsClickTargetHandler = (event) => {
    const variantCardElement = event.target.closest('[data-collection-item]');
    const clickOnSize = checkParentsForClass(event.target, 'collection__size-variant-text');
    const clickOnColor = checkParentsForClass(event.target, 'collection__item-color-wrap');
    const clickOnMobileQuickAddShowButton = checkParentsForClass(event.target, 'collection__item-quick-add-btn-wrap');
    const clickOnShowMoreColorsButton = checkParentsForClass(event.target, 'collection__show-more-colors-btn');
    const clickOnAddToCartButton = checkParentsForClass(event.target, 'collection__add-to-cart');

    if (clickOnSize) {
      const clickedSize = event.target.dataset.variantSize;
      const selectedColor = variantCardElement.dataset.selectedColor;
      const productHandle = variantCardElement.dataset.productHandle;
      const sizeButtonElements = variantCardElement.querySelectorAll('[data-variant-size]');
      const preorderWrapperElement = variantCardElement.querySelector('.collection__preorder-wrap');

      const isVariantReadyToFetch = variantCardElement.dataset.isVariantReadyToFetch === 'false';

      if (isVariantReadyToFetch) {
        variantCardElement.dataset.selectedSize = clickedSize;

        sizeButtonElements.forEach((sizeButtonElement) => {
          sizeButtonElement.classList.remove('collection__size-variant-text_selected');
        });

        event.target.classList.add('collection__size-variant-text_selected');

        const checkVariantAvailability = async () => {
          variantCardElement.dataset.isVariantReadyToFetch = 'true';
          const response = await this.getProductInfo(productHandle);

          if (response) {
            response.variants.forEach((variant) => {
              const parts = variant.title.split('/').map(part => part.trim());
              const color = parts[0];
              const size = parts[1];

              const isClickedSizeInVariantTitle = size === clickedSize;
              const isSelectedColorInVariantTitle = color === selectedColor;

              if (isClickedSizeInVariantTitle && isSelectedColorInVariantTitle) {
                variantCardElement.dataset.variantId = variant.id;

                if (variant.available) {
                  preorderWrapperElement.classList.remove('disp-flx-imp');
                  variantCardElement.dataset.isVariantInStock = 'true';
                } else {
                  preorderWrapperElement.classList.add('disp-flx-imp');
                  variantCardElement.dataset.isVariantInStock = 'false';
                }
              }
            });
          }

          variantCardElement.dataset.isVariantReadyToFetch = 'false';
        }

        checkVariantAvailability();
      }
    }

    if (clickOnColor) {
      const clickedColor = event.target.closest('[data-color-name]').dataset.colorName;
      const selectedSize = variantCardElement.dataset.selectedSize;
      const productHandle = variantCardElement.dataset.productHandle;
      const productTitle = variantCardElement.dataset.productTitle;
      const preorderWrapperElement = variantCardElement.querySelector('.collection__preorder-wrap');

      const targetProductCardElement = this.productsContainerElement.querySelector(`[data-product-title="${productTitle}"][data-default-color="${clickedColor}"]`);
      const newFirstImageUrl = targetProductCardElement.dataset.firstImage;
      const newSecondImageUrl = targetProductCardElement.dataset.secondImage;
      const firstImageElement = variantCardElement.querySelector('.collection__item-bg-img');
      const secondImageElement = variantCardElement.querySelector('.collection__item-bg-img-hover');
      const productTitleElement = variantCardElement.querySelector('.collection__item-title');

      const isVariantReadyToFetch = variantCardElement.dataset.isVariantReadyToFetch === 'false';

      if (isVariantReadyToFetch) {
        firstImageElement.setAttribute('style', `background-image: url(${newFirstImageUrl})`);

        if (secondImageElement) {
          secondImageElement.setAttribute('style', `background-image: url(${newSecondImageUrl})`);
        }

        variantCardElement.dataset.selectedColor = clickedColor;
        productTitleElement.innerHTML = `${productTitle} ${clickedColor}`;

        const checkVariantAvailability = async () => {
          const response = await this.getProductInfo(productHandle);

          if (response) {
            response.variants.forEach((variant) => {
              const parts = variant.title.split('/').map(part => part.trim());
              const color = parts[0];
              const size = parts[1];

              const isSelectedSizeInVariantTitle = size === selectedSize;
              const isClickedColorInVariantTitle = color === clickedColor;

              if (isSelectedSizeInVariantTitle && isClickedColorInVariantTitle) {
                variantCardElement.dataset.variantId = variant.id;

                if (variant.available) {
                  preorderWrapperElement.classList.remove('disp-flx-imp');
                  variantCardElement.dataset.isVariantInStock = 'true';
                } else {
                  preorderWrapperElement.classList.add('disp-flx-imp');
                  variantCardElement.dataset.isVariantInStock = 'false';
                }
              }
            });
          }

          variantCardElement.dataset.isVariantReadyToFetch = 'false';
        }

        checkVariantAvailability();
      }
    }

    if (clickOnAddToCartButton) {
      const variantId = variantCardElement.dataset.variantId;
      const addToCartButtonElement = variantCardElement.querySelector('.collection__add-to-cart');
      const addToCartLoaderElement = variantCardElement.querySelector('.collection__add-to-cart-loader');
      const isVariantReadyToFetch = variantCardElement.dataset.isVariantReadyToFetch === 'false';
      const isVariantInStock = variantCardElement.dataset.isVariantInStock === 'true';

      if (isVariantReadyToFetch && isVariantInStock) {
        variantCardElement.dataset.isVariantReadyToFetch = 'true';

        addToCartButtonElement.classList.add('disp-none-imp');
        addToCartLoaderElement.classList.add('disp-flx-imp');

        const addToCartAndDisableLoader = async () => {
          const response = await addToCart(variantId, 1);

            if (response) {
              const customEvent = new CustomEvent("dispatch:cart-flyover:refresh", {
                bubbles: true
              });
              document.dispatchEvent(customEvent);

              if (addToCartLoaderElement) {
                addToCartButtonElement.classList.remove('disp-none-imp');
                addToCartLoaderElement.classList.remove('disp-flx-imp');
              }
            }

          variantCardElement.dataset.isVariantReadyToFetch = 'false';
        }

        addToCartAndDisableLoader();
      }
    }

    if (clickOnMobileQuickAddShowButton) {
      const quickAddPanelElement = variantCardElement.querySelector('[data-quick-add-panel]');
      const quickAddMobileButtonElement = variantCardElement.querySelector('[data-quick-add-button]');
      quickAddPanelElement.classList.add('collection__quick-add-panel_show-mobile');
      quickAddMobileButtonElement.classList.add('disp-none-imp');
    }

    if (clickOnShowMoreColorsButton) {
      const showMoreColorsButtonElement = variantCardElement.querySelector('.collection__show-more-colors-btn');
      const hiddenColorsElements = variantCardElement.querySelectorAll('.collection__item-color-wrap_hide-mobile');

      showMoreColorsButtonElement.classList.add('disp-none-imp');

      hiddenColorsElements.forEach((colorElement) => {
        colorElement.classList.remove('collection__item-color-wrap_hide-mobile');
      });
    }
  }

  watchProductsClickTarget () {
    this.productsContainerElement.addEventListener('click', this.watchProductsClickTargetHandler);
  }

  watchFiltersClickTargetHandler (event) {
    const isClickOnFilterCategoryTitle = checkParentsForClass(event.target, 'collection__sort-category-title-wrap');
    const isClickOnSeeMore = checkParentsForClass(event.target, 'collection__sort-category-see-more');

    if (isClickOnFilterCategoryTitle) {
      const clickOnSortCategoryTitleElement = event.target.closest('.collection__sort-category-title-wrap');
      const hasCategoryTitleStatus = clickOnSortCategoryTitleElement.querySelector('[data-filter-category-status]');

      if (hasCategoryTitleStatus) {
        const filterCategoryElement = event.target.closest('[data-is-filter-category-open]');
        const isFilterCategoryOpen = filterCategoryElement.dataset.isFilterCategoryOpen === "true";

        if (isFilterCategoryOpen) {
          filterCategoryElement.dataset.isFilterCategoryOpen = "false";
        } else {
          filterCategoryElement.dataset.isFilterCategoryOpen = "true";
        }
      }
    }

    if (isClickOnSeeMore) {
      const sortCategoryWrapperElement = event.target.closest('.collection__sort-category-wrap');
      const optionsElements = sortCategoryWrapperElement.querySelectorAll('li');
      const seeMoreElement = sortCategoryWrapperElement.querySelector('.collection__sort-category-see-more');
      const seeMoreTextElement = sortCategoryWrapperElement.querySelector('.collection__sort-category-see-more-text');
      const seeLessTextElement = sortCategoryWrapperElement.querySelector('.collection__sort-category-see-less-text');
      const isSeeMoreOpen = seeMoreElement.dataset.isSeeMoreOpen === 'true';

      optionsElements.forEach((optionElement) => {
        const isOptionToHide = optionElement.dataset.optionToHide && optionElement.dataset.optionToHide === 'true';

        if (isOptionToHide) {
          const labelElement = optionElement.querySelector('label');

          if (isSeeMoreOpen) {
            optionElement.classList.add('collection__sort-category-option_hidden');
            labelElement.classList.add('disp-none-imp');
          } else {
            optionElement.classList.remove('collection__sort-category-option_hidden');
            labelElement.classList.remove('disp-none-imp');
          }
        }
      });

      if (isSeeMoreOpen) {
        seeMoreElement.dataset.isSeeMoreOpen = 'false';
        seeMoreTextElement.classList.remove('disp-none-imp');
        seeLessTextElement.classList.add('disp-none-imp');
      } else {
        seeMoreElement.dataset.isSeeMoreOpen = 'true';
        seeMoreTextElement.classList.add('disp-none-imp');
        seeLessTextElement.classList.remove('disp-none-imp');
      }
    }
  }

  watchFiltersClickTarget () {
    this.filtersContainerElement.addEventListener('click', this.watchFiltersClickTargetHandler);
  }

  seeMore () {
    if (this.seeMoreButtonElement) {
      this.seeMoreButtonElement.addEventListener('click', this.seeMoreButtonHandler);
    }

    this.loadProductsPage2();
  }

  addListeners () {
    this.watchProductsClickTarget();
    this.watchFiltersClickTarget();
    this.seeMore();
  }

  removeListeners () {
    window.removeEventListener('scroll', this.scrollDebounceHandler);

    if (this.seeMoreButtonElement) {
      this.seeMoreButtonElement.removeEventListener('click', this.seeMoreButtonHandler);
    }

    if (this.productsContainerElement) {
      this.productsContainerElement.removeEventListener('click', this.watchProductsClickTargetHandler);
    }

    if (this.filtersContainerElement) {
      this.filtersContainerElement.removeEventListener('click', this.watchFiltersClickTargetHandler);
    }
  }
}
