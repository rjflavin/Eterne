import {addToCart} from "../utils/cart-handler";
import {checkParentsForClass} from "../utils/check-parents-for-class";
import {debounce} from "../utils/debounce";
import {formatPrice} from "../utils/format-price";

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

    this.isLoading = false;

    this.loadMoreProducts = () => {
      if (this.isLoading) return;
      if (window.scrollY + window.innerHeight >= this.getProductsContainerScrollHeight() - this.getProductCardHeight() * 2) {
        const nextPageUrl = this.productsContainerElement.dataset.nextUrl;

        if (nextPageUrl) {
          this.isLoading = true;
          fetch(nextPageUrl, {
            method: 'GET',
            headers: {
              'Content-Type': 'text/html; charset=utf-8'
            }
          })
              .then((response) => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.text();
              })
              .then((responseText) => {
                const newHtml = new DOMParser().parseFromString(responseText, 'text/html');
                const newNextUrl = newHtml.querySelector('[data-next-url]')?.dataset.nextUrl;
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

                const items = document.querySelectorAll('.lazyLoad');
                items.forEach(item => {
                  item.style.backgroundImage = "url('" + item.dataset.bgimage + "')";
                });

                this.isLoading = false;
              })
              .catch((error) => {
                console.error('Error fetching data:', error);
                this.isLoading = false;
                console.log('isLoading after error:', this.isLoading);
              });
        }
      }
    };

    this.scrollDebounceHandler = debounce(() => {
      this.loadMoreProducts();
    }, 300);

    this.infiniteScrollProducts = () => {
      const textHtml = this._page2Content;
      this.productsContainerElement.insertAdjacentHTML("beforeend", textHtml);
      const newProductCardElements = this.productsContainerElement.querySelectorAll('[data-collection-item]');
      newProductCardElements.forEach((newProductCardElement) => {
        newProductCardElement.removeAttribute('xmlns');
      });
      this._page2Content = "";

      this.seeMoreButtonElement.classList.add('disp-none-imp');
      this.seeMoreLoaderElement.classList.add('disp-none-imp');

      const items = document.querySelectorAll('.lazyLoad');
      items.forEach(item => {
        item.style.backgroundImage = "url('" + item.dataset.bgimage + "')";
      });

      window.addEventListener('scroll', this.scrollDebounceHandler);
    };

    this.loadProductsPage2 = () => {
      const nextPageUrl = this.productsContainerElement.dataset.nextUrl;

      fetch(nextPageUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'text/html; charset=utf-8'
        }
      })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text();
          })
          .then((responseText) => {
            const newHtml = new DOMParser().parseFromString(responseText, 'text/html');
            const newNextUrl = newHtml.querySelector('[data-next-url]')?.dataset.nextUrl;
            const newProductsContainerElement = newHtml.querySelectorAll('[data-collection-item]');
            const newProductsDocumentFragment = document.createDocumentFragment();

            newProductsContainerElement.forEach((newProductElement) => {
              newProductsDocumentFragment.appendChild(newProductElement);
            });

            const serializer = new XMLSerializer();
            this._page2Content = serializer.serializeToString(newProductsDocumentFragment);

            if (newNextUrl) {
              this.productsContainerElement.dataset.nextUrl = newNextUrl;
            } else {
              this.productsContainerElement.dataset.nextUrl = '';
            }

            const seeMoreLoaderElement = this.querySelector('[data-see-more-loader]');

            if (seeMoreLoaderElement && !seeMoreLoaderElement.classList.contains('disp-none-imp')) {
              this.infiniteScrollProducts();
            }
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
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

  connectedCallback() {
  }

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

  getProductsContainerScrollHeight() {
    const productsContainerElements = this.querySelector('.collection__products');

    return productsContainerElements.scrollHeight;
  }

  getProductCardHeight() {
    const productElement = this.querySelector('[data-collection-item]');

    return productElement.scrollHeight;
  }

  filtersVisibilityToggle() {
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
    const currencySymbol = document.querySelector('body').dataset.currencySymbol.trim();
    const clickOnSize = checkParentsForClass(event.target, 'collection__size-variant-text');
    const clickOnColor = checkParentsForClass(event.target, 'collection__item-color-wrap');
    const clickOnMobileQuickAddShowButton = checkParentsForClass(event.target, 'collection__item-quick-add-btn-wrap');
    const clickOnShowMoreColorsButton = checkParentsForClass(event.target, 'collection__show-more-colors-btn');
    const clickOnAddToCartButton = checkParentsForClass(event.target, 'collection__add-to-cart');

    if (clickOnSize) {
      const isAllVariantsSold = variantCardElement.dataset.isAnyVariantInStock === "false";
      const clickedSize = event.target.dataset.variantSize;
      const selectedColor = variantCardElement.dataset.selectedColor;
      const productHandle = variantCardElement.dataset.productHandle;
      const sizeButtonElements = variantCardElement.querySelectorAll('[data-variant-size]');
      const preorderWrapperElement = variantCardElement.querySelector('.collection__preorder-wrap');
      const productPriceElement = variantCardElement.querySelector('.collection__item-price');

      const isVariantReadyToFetch = variantCardElement.dataset.isVariantReadyToFetch === 'true';

      if (isVariantReadyToFetch) {
        variantCardElement.dataset.selectedSize = clickedSize;

        sizeButtonElements.forEach((sizeButtonElement) => {
          sizeButtonElement.classList.remove('collection__size-variant-text_selected');
        });

        event.target.classList.add('collection__size-variant-text_selected');

        const checkVariantAvailability = async () => {
          variantCardElement.dataset.isVariantReadyToFetch = 'false';
          const response = await this.getProductInfo(productHandle);

          if (response) {
            response.variants.forEach((variant) => {
              const parts = variant.title.split('/').map(part => part.trim());
              const color = parts[0];
              const size = parts[1];

              const isClickedSizeInVariantTitle = size === clickedSize;
              const isSelectedColorInVariantTitle = color === selectedColor;

              if (isClickedSizeInVariantTitle && isSelectedColorInVariantTitle) {
                productPriceElement.innerHTML = `${currencySymbol}${formatPrice(variant.price)}`;
                variantCardElement.dataset.variantId = variant.id;

                if (isAllVariantsSold) {
                  return;
                } else {
                  if (variant.available) {
                    preorderWrapperElement.classList.remove('disp-flx-imp');
                    variantCardElement.dataset.isVariantInStock = 'true';
                  } else {
                    preorderWrapperElement.classList.add('disp-flx-imp');
                    variantCardElement.dataset.isVariantInStock = 'false';
                  }
                }
              }
            });
          }

          variantCardElement.dataset.isVariantReadyToFetch = 'true';
        }

        checkVariantAvailability();
      }
    }

    if (clickOnColor) {
      const isLoadedWithFilters = variantCardElement.dataset.isLoadedWithFilters === "true";
      const clickedColor = event.target.closest('[data-color-name]').dataset.colorName;
      const selectedSize = variantCardElement.dataset.selectedSize;
      const productHandle = variantCardElement.dataset.productHandle;
      const productTitle = variantCardElement.dataset.productTitle;
      const preorderWrapperElement = variantCardElement.querySelector('.collection__preorder-wrap');
      const firstImageElement = variantCardElement.querySelector('.collection__item-bg-img');
      const secondImageElement = variantCardElement.querySelector('.collection__item-bg-img-hover');
      const productTitleElement = variantCardElement.querySelector('.collection__item-title');
      const productPriceElement = variantCardElement.querySelector('.collection__item-price');

      const isVariantReadyToFetch = variantCardElement.dataset.isVariantReadyToFetch === 'true';

      if (isVariantReadyToFetch) {
        if (isLoadedWithFilters) {
          const emptyImageUrl = variantCardElement.dataset.emptyImage;
          const hoverImages = variantCardElement.dataset.hoverImages;

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
                  const featuredImageUrl = variant.featured_image?.src;
                  productPriceElement.innerHTML = `${currencySymbol}${formatPrice(variant.price)}`;
                  variantCardElement.dataset.variantId = variant.id;
                  variantCardElement.dataset.selectedColor = clickedColor;
                  productTitleElement.innerHTML = `${productTitle} ${clickedColor}`;

                  const items = hoverImages.split(";").filter(item => item);
                  const hoverImagesArray = items.map(item => {
                    const [variantId, hoverImageUrl] = item.split(",");
                    return { variantId: parseInt(variantId), hoverImageUrl };
                  });

                  let firstImageUrl;
                  if (featuredImageUrl) {
                    firstImageUrl = featuredImageUrl;
                  } else {
                    firstImageUrl = emptyImageUrl;
                  }
                  firstImageElement.setAttribute('style', `background-image: url(${firstImageUrl})`);

                  const variantHoverImageUrl = hoverImagesArray.find(item => item.variantId === variant.id)?.hoverImageUrl;
                  let secondImageUrl;
                  if (variantHoverImageUrl) {
                    secondImageUrl = variantHoverImageUrl;
                  } else if (firstImageUrl) {
                    secondImageUrl = firstImageUrl;
                  } else {
                    secondImageUrl = emptyImageUrl;
                  }
                  secondImageElement.setAttribute('style', `background-image: url(${secondImageUrl})`);

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

            variantCardElement.dataset.isVariantReadyToFetch = 'true';
          }

          checkVariantAvailability();
        } else {
          console.log('false')
          const targetProductCardElement = this.productsContainerElement.querySelector(`[data-product-title="${productTitle}"][data-default-color="${clickedColor}"]`);
          const newFirstImageUrl = targetProductCardElement.dataset.firstImage;
          const newSecondImageUrl = targetProductCardElement.dataset.secondImage;

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

            variantCardElement.dataset.isVariantReadyToFetch = 'true';
          }

          checkVariantAvailability();
        }
      }
    }

    if (clickOnAddToCartButton) {
      const variantId = variantCardElement.dataset.variantId;
      const addToCartButtonElement = variantCardElement.querySelector('.collection__add-to-cart');
      const addToCartLoaderElement = variantCardElement.querySelector('.collection__add-to-cart-loader');
      const isVariantReadyToFetch = variantCardElement.dataset.isVariantReadyToFetch === 'true';
      const isSelectedVariantInStock = variantCardElement.dataset.isVariantInStock === 'true';

      if (isVariantReadyToFetch && isSelectedVariantInStock) {
        variantCardElement.dataset.isVariantReadyToFetch = 'false';

        addToCartButtonElement.classList.add('disp-none-imp');
        addToCartLoaderElement.classList.add('disp-flx-imp');

        const addToCartAndDisableLoader = async () => {
          const response = await addToCart(variantId, 1);

          if (response) {
            const e = new CustomEvent("dispatch:cart-flyover:refresh", {bubbles: true});
            document.dispatchEvent(e);

            const event = new CustomEvent("dispatch:cart-drawer:open", {bubbles: true});
            document.dispatchEvent(event);

            if (addToCartLoaderElement) {
              addToCartButtonElement.classList.remove('disp-none-imp');
              addToCartLoaderElement.classList.remove('disp-flx-imp');
            }
          }

          variantCardElement.dataset.isVariantReadyToFetch = 'true';
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

  watchProductsClickTarget() {
    this.productsContainerElement.addEventListener('click', this.watchProductsClickTargetHandler);
  }

  watchFiltersClickTargetHandler(event) {
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
      const sortCategoryWrapperElement = event.target.closest('.collection__sort-category-fieldset');
      const optionsElements = sortCategoryWrapperElement.querySelectorAll('li');
      const seeMoreElement = sortCategoryWrapperElement.querySelector('.collection__sort-category-see-more');
      const seeMoreTextElement = sortCategoryWrapperElement.querySelector('.collection__sort-category-see-more-text');
      const seeLessTextElement = sortCategoryWrapperElement.querySelector('.collection__sort-category-see-less-text');
      const renderAttribute = sortCategoryWrapperElement.closest('[data-render]').getAttribute('data-render');
      const isSeeMoreOpenKey = `isSeeMoreOpen_${renderAttribute}`;
      const isSeeMoreOpen = localStorage.getItem(isSeeMoreOpenKey) === 'true';

      seeMoreElement.dataset.isSeeMoreOpen = isSeeMoreOpen ? 'true' : 'false';

      optionsElements.forEach((optionElement) => {
        const isOptionToHide = optionElement.dataset.optionToHide;

        if (isOptionToHide) {
          const labelElement = optionElement.querySelector('label');
          optionElement.classList.toggle('collection__sort-category-option_hidden', isSeeMoreOpen);
          labelElement.classList.toggle('disp-none-imp', isSeeMoreOpen);
        }
      });

      seeMoreTextElement.classList.toggle('disp-none-imp', isSeeMoreOpen);
      seeLessTextElement.classList.toggle('disp-none-imp', !isSeeMoreOpen);

      localStorage.setItem(isSeeMoreOpenKey, isSeeMoreOpen ? 'false' : 'true');
    }
  }

  watchFiltersClickTarget() {
    this.filtersContainerElement.addEventListener('click', this.watchFiltersClickTargetHandler);
  }

  seeMore() {
    if (this.seeMoreButtonElement) {
      this.seeMoreButtonElement.addEventListener('click', this.seeMoreButtonHandler);
    }

    this.loadProductsPage2();
  }

  addListeners() {
    this.watchProductsClickTarget();
    this.watchFiltersClickTarget();
    this.seeMore();
  }

  removeListeners() {
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
