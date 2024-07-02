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
                    const loadingSpinner = document.querySelector('.loading-spinner');

                    if (loadingSpinner) {
                        loadingSpinner.classList.remove('disp-none-imp');
                    }

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
                                const highQualityImage = item.dataset.bgimage;
                                const img = new Image();
                                img.src = highQualityImage;
                                img.onload = () => {
                                    item.style.backgroundImage = `url('${highQualityImage}')`;
                                    item.style.filter = 'none';
                                };
                            });

                            this.isLoading = false;
                            if (loadingSpinner) {
                                loadingSpinner.classList.add('disp-none-imp')
                            }
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
                const highQualityImage = item.dataset.bgimage;
                const img = new Image();
                img.src = highQualityImage;
                img.onload = () => {
                    item.style.backgroundImage = `url('${highQualityImage}')`;
                    item.style.filter = 'none';
                };
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
        const clickOnColor = checkParentsForClass(event.target, 'gsw-list-products-group');
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
                    const response = await this.getProductInfo(productHandle);
                    const sizesByColor = {};

                    if (response) {
                        response.variants.forEach((variant) => {
                            const parts = variant.title.split('/').map(part => part.trim());
                            const color = parts[0];
                            const size = parts[1];

                            if (!sizesByColor[color]) {
                                sizesByColor[color] = [];
                            }

                            sizesByColor[color].push({size, available: variant.available});
                        });

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

                                const inventoryPolicyDivs = variantCardElement.querySelectorAll('.variant_inventory_policy div');

                                if (inventoryPolicyDivs) {
                                    inventoryPolicyDivs.forEach(div => {
                                        const variantIdPolicy = div.getAttribute('data-variant-id-policy');
                                        const inventoryPolicy = div.getAttribute('data-variant-inventory-policy');

                                        if (variantIdPolicy === variantCardElement.dataset.variantId && inventoryPolicy === 'continue' && variant.available) {
                                            preorderWrapperElement.classList.add('disp-flx-imp');
                                            variantCardElement.dataset.isVariantInStock = 'false';
                                        }
                                    });
                                }
                            });
                        }
                    }

                    variantCardElement.dataset.isVariantReadyToFetch = 'true';
                }

                checkVariantAvailability();
            }
        }

        if (clickOnColor) {
            event.preventDefault()

            let selectedSize = variantCardElement.dataset.selectedSize;
            const productHandle = variantCardElement.dataset.productHandle;
            const preorderWrapperElement = variantCardElement.querySelector('.collection__preorder-wrap');
            const firstImageElement = variantCardElement.querySelector('.collection__item-bg-img');
            const secondImageElement = variantCardElement.querySelector('.collection__item-bg-img-hover');
            const productTitleElement = variantCardElement.querySelector('.collection__item-title');
            const productPriceElement = variantCardElement.querySelector('.collection__item-price');

            const isVariantReadyToFetch = variantCardElement.dataset.isVariantReadyToFetch === 'true';

            if (isVariantReadyToFetch) {
                const emptyImageUrl = variantCardElement.dataset.emptyImage;

                const checkProductAvailability = async () => {
                    const response = await this.getProductInfo(productHandle);
                    const sizesByColor = {};

                    if (response) {
                        const closestLinkElement = event.target.closest('.gsw-prg-item--link');
                        const closestGroupElement = event.target.closest('.gsw-list-products-group');
                        let clickedColor = null;

                        closestGroupElement.querySelectorAll('.gsw-prg-item--link').forEach(function (link) {
                            link.classList.remove('is-gsw-active');
                        })

                        closestLinkElement.classList.add('is-gsw-active');

                        const productLink = closestLinkElement.getAttribute('href');

                        if (productLink && productLink.trim() !== '') {
                            let newProductHandle = productLink.split('/').pop();

                            const response = await this.getProductInfo(newProductHandle);

                            if (response) {
                                const featuredImageUrl =  response.media[0] ? response.media[0]?.src : null;
                                clickedColor = response.variants[0].option1;

                                let firstImageUrl = featuredImageUrl || emptyImageUrl;
                                firstImageElement.setAttribute('style', `background-image: url(${firstImageUrl})`);

                                let secondImageUrl = response.media[1] ? response.media[1]?.src : firstImageUrl;
                                secondImageElement.setAttribute('style', `background-image: url(${secondImageUrl})`);

                                let linkUrl = variantCardElement.querySelector('.collection__item-link')

                                linkUrl.href = response.url

                                variantCardElement.dataset.productHandle = newProductHandle;
                                variantCardElement.dataset.variantId = response.id;
                                variantCardElement.dataset.selectedColor = response.variants[0].option1;
                                variantCardElement.dataset.productTitle = response.title;
                                variantCardElement.dataset.firstImage = firstImageUrl;
                                variantCardElement.dataset.secondImage = secondImageUrl;
                                variantCardElement.dataset.hoverImages = secondImageUrl;

                                productPriceElement.innerHTML = `${currencySymbol}${formatPrice(response.price)}`;
                                productTitleElement.innerHTML = response.title;

                                response.variants.forEach((variant) => {
                                    const parts = variant.title.split('/').map(part => part.trim());
                                    const color = parts[0];
                                    const size = parts[1];

                                    if (!sizesByColor[color]) {
                                        sizesByColor[color] = [];
                                    }

                                    sizesByColor[color].push({size, available: variant.available});
                                });

                                const availableSizes = sizesByColor[clickedColor] || [];
                                updateAvailableSizesUI(availableSizes);

                                const firstAvailableSize = availableSizes.find(({ available }) => available)?.size;
                                if (firstAvailableSize) {
                                    selectedSize = firstAvailableSize;
                                    variantCardElement.dataset.selectedSize = selectedSize;

                                    response.variants.forEach((variant) => {
                                        const parts = variant.title.split('/').map(part => part.trim());
                                        const color = parts[0];
                                        const size = parts[1];

                                        const isSelectedSizeInProductTitle = size === selectedSize;
                                        const isClickedColorInProductTitle = color === clickedColor;

                                        if (isSelectedSizeInProductTitle && isClickedColorInProductTitle) {
                                            productPriceElement.innerHTML = `${currencySymbol}${formatPrice(variant.price)}`;
                                            variantCardElement.dataset.variantId = variant.id;
                                            variantCardElement.dataset.selectedColor = clickedColor;
                                        }
                                    });
                                }
                            }
                        }

                        console.log(response.available)
                        const inventoryPolicyDivs = variantCardElement.querySelectorAll('.variant_inventory_policy div');

                        if (response.available) {
                            preorderWrapperElement.classList.remove('disp-flx-imp');
                            variantCardElement.dataset.isVariantInStock = 'true';

                            if (inventoryPolicyDivs) {
                                inventoryPolicyDivs.forEach(div => {
                                    const variantIdPolicy = div.getAttribute('data-variant-id-policy');
                                    const inventoryPolicy = div.getAttribute('data-variant-inventory-policy');

                                    if (variantIdPolicy === variantCardElement.dataset.variantId && inventoryPolicy === 'continue') {
                                        preorderWrapperElement.classList.add('disp-flx-imp');
                                        variantCardElement.dataset.isVariantInStock = 'false';
                                    }
                                });
                            }
                        } else {
                            preorderWrapperElement.classList.remove('disp-flx-imp');
                            variantCardElement.dataset.isVariantInStock = 'false';
                        }
                    }

                    variantCardElement.dataset.isVariantReadyToFetch = 'true';
                }

                checkProductAvailability();

                const updateAvailableSizesUI = (sizes) => {
                    const sizeContainer = variantCardElement.querySelector('.collection__size-variants');
                    sizeContainer.innerHTML = '';

                    let firstAvailableSize = null;

                    sizes.forEach(({ size, available }) => {
                        const sizeElement = document.createElement('div');
                        sizeElement.className = 'collection__size-variant-text no-select';
                        sizeElement.innerText = size;
                        sizeElement.dataset.variantSize = size;

                        if (!available) {
                            sizeElement.classList.add('disabled');
                        } else if (firstAvailableSize === null) {
                            firstAvailableSize = size;
                            sizeElement.classList.remove('no-select');
                            sizeElement.classList.add('collection__size-variant-text_selected');
                        }

                        sizeContainer.appendChild(sizeElement);
                    });

                    if (firstAvailableSize) {
                        selectedSize = firstAvailableSize;
                    }
                }
            }
        }

        if (clickOnAddToCartButton) {
            const variantId = variantCardElement.dataset.variantId;
            const addToCartButtonElement = variantCardElement.querySelector('.collection__add-to-cart');
            const addToCartLoaderElement = variantCardElement.querySelector('.collection__add-to-cart-loader');
            const isVariantReadyToFetch = variantCardElement.dataset.isVariantReadyToFetch === 'true';
            let isSelectedVariantInStock = variantCardElement.dataset.isVariantInStock === 'true';
            const inventoryPolicyDivs = variantCardElement.querySelectorAll('.variant_inventory_policy div');

            inventoryPolicyDivs.forEach(div => {
                const variantIdPolicy = div.getAttribute('data-variant-id-policy');
                const inventoryPolicy = div.getAttribute('data-variant-inventory-policy');

                if (variantIdPolicy === variantCardElement.dataset.variantId && inventoryPolicy === 'continue') {
                    isSelectedVariantInStock = variantCardElement.dataset.isVariantInStock = 'false';
                }
            });

            if (isVariantReadyToFetch && isSelectedVariantInStock) {
                variantCardElement.dataset.isVariantReadyToFetch = 'false';

                addToCartButtonElement.classList.add('disp-none-imp');
                addToCartLoaderElement.classList.add('disp-flx-imp');

                const addToCartAndDisableLoader = async () => {
                    const response = await addToCart(variantId, 1);

                    if (response) {
                        const hasResponseError = !response.items;

                        if (!hasResponseError) {
                            const emptyCartElement = document.getElementById('CartDrawerEmptyState');
                            if (!emptyCartElement.classList.contains('disp-none-imp')) {
                                emptyCartElement.classList.add('disp-none-imp');
                            }
                        }

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

            seeMoreTextElement.classList.toggle('disp-none-imp', !isSeeMoreOpen);
            seeLessTextElement.classList.toggle('disp-none-imp', isSeeMoreOpen);

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
