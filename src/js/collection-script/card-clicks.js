import { checkParentsForClass } from "../utils/check-parents-for-class";

const productsContainerElement = document.querySelector('[data-products-container]');

const addToCart = async (variantId) => {
  let data = {
    'items': [{
      'id': variantId,
      'quantity': 1
    }]
  };

  let result;
  await fetch(window.Shopify.routes.root + 'cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      result = response.json();
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  return result;
}

const getProductInfo = async (productHandle) => {
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

productsContainerElement.addEventListener('click', (event) => {
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
        const response = await getProductInfo(productHandle);

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

    const targetProductCardElement = productsContainerElement.querySelector(`[data-product-title="${productTitle}"][data-default-color="${clickedColor}"]`);
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
        const response = await getProductInfo(productHandle);

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
        const response = await addToCart(variantId);

        if (response) {
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
});
