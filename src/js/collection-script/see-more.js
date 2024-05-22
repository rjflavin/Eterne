const getProductsContainerScrollHeight = () => {
  const productsContainerElements = document.querySelector('[data-products-container]');

  return productsContainerElements.scrollHeight;
}

const getProductCardHeight = () => {
  const productElement = document.querySelector('[data-collection-item]');

  return productElement.scrollHeight;
}

function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

const productsCollectionElement = document.getElementById('ProductsCollection');
const productsContainerElement = productsCollectionElement.querySelector('[data-products-container]');
const seeMoreButtonElement = productsCollectionElement.querySelector('[data-see-more-button]');
const seeMoreLoaderElement = productsCollectionElement.querySelector('[data-see-more-loader]');

seeMoreButtonElement.addEventListener('click', (event) => {
  event.preventDefault();

  if (sessionStorage.getItem('productsPage2')) {
    infiniteScrollProducts();
  } else {
    seeMoreButtonElement.classList.add('disp-none-imp');
    seeMoreLoaderElement.classList.remove('disp-none-imp');
  }
});

const infiniteScrollProducts = () => {
  // insert page 2 products
  const tempElement = document.createDocumentFragment();
  const node = new DOMParser().parseFromString(sessionStorage.getItem('productsPage2'), "text/html").body;
  sessionStorage.removeItem('productsPage2');
  node.childNodes.forEach((childElement) => {
    childElement.removeAttribute('xmlns');
    tempElement.append(childElement);
  });
  productsContainerElement.appendChild(tempElement);
  seeMoreButtonElement.classList.add('disp-none-imp');
  seeMoreLoaderElement.classList.add('disp-none-imp');

  const loadMoreProducts = () => {
    if (window.scrollY + window.innerHeight >= getProductsContainerScrollHeight() - getProductCardHeight() * 2) {
      const nextPageUrl = document.querySelector('[data-next-url]').dataset.nextUrl;

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
            productsContainerElement.appendChild(newProductsDocumentFragment);

            if (newNextUrl) {
              const productsContainerElement = document.querySelector('[data-products-container]');
              productsContainerElement.dataset.nextUrl = newNextUrl;
            } else {
              const productsContainerElement = document.querySelector('[data-products-container]');
              productsContainerElement.dataset.nextUrl = '';
            }
          });
      }
    }
  }

  const scrollDebounce = debounce(() => {
    loadMoreProducts();
  }, 300);

  window.addEventListener('scroll', () => {
    scrollDebounce();
  });
}

const loadProductsPage2 = () => {
  const nextPageUrl = document.querySelector('[data-next-url]').dataset.nextUrl;

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
      const newProductsDocumentFragmentAsString = serializer.serializeToString(newProductsDocumentFragment);
      sessionStorage.setItem('productsPage2', newProductsDocumentFragmentAsString);

      if (newNextUrl) {
        const productsContainerElement = document.querySelector('[data-products-container]');
        productsContainerElement.dataset.nextUrl = newNextUrl;
      }

      if (!seeMoreLoaderElement.classList.contains('disp-none-imp')) {
        infiniteScrollProducts();
      }
    });
}

loadProductsPage2();
