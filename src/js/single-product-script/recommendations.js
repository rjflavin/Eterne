import {addToCart} from "../utils/cart-handler";

export default class RecommendationProducts extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.fetchProductRecommendations();
    }

    fetchProductRecommendations() {
        fetch(this.dataset.url)
            .then(response => response.text())
            .then((recommendationHtml) => {
                const newHtmlDocument = new DOMParser().parseFromString(recommendationHtml, 'text/html')
                const recommendations = newHtmlDocument.querySelector(`.${this.classList}`);

                if (recommendations && recommendations.innerHTML.trim().length) {
                    this.innerHTML = recommendations.innerHTML;
                    this.watchShowMore();
                    this.watchRecommendedQuickAdd();
                    this.changeSize();
                    this.watchShowQuickAddButtons();
                }
            });
    }

    changeSize() {
        this.querySelectorAll('.product-recommendations [name="recommended-product-size"]').forEach((sizeElem) => {
            sizeElem.addEventListener('change', (e) => {
                e.preventDefault();
                const activeLabelClass = 'product__size-label--checked';
                const activeInputClass = 'product__size-item--checked';
                const targetLabel = this.querySelector(`label[for="${sizeElem.id}"]`);
                const targetInput = e.target;
                const oldSelectedSize = sizeElem.closest('.product__size-variants').querySelector(`.${activeLabelClass}`);
                const preorderedLink = targetInput.dataset.preorderVariantLink;
                const quickAddPannelElement = targetInput.closest('.product__quick-add-panel');
                const preorderButton = quickAddPannelElement.querySelector('.preorder-button');
                const addToCartButton = quickAddPannelElement.querySelector('.product__add-to-cart');
                if (preorderedLink) {
                    preorderButton.href = preorderedLink;
                    preorderButton.classList.remove('hidden');
                    addToCartButton.classList.add('hidden');
                } else {
                    preorderButton.classList.add('hidden');
                    addToCartButton.classList.remove('hidden');
                }

                const oldSelectedSizeInput = sizeElem.closest('.product__size-variants').querySelector(`.${activeInputClass}`);
                if (!targetInput.classList.contains(activeInputClass)) {
                    targetLabel.classList.add(activeLabelClass);
                    targetInput.classList.add(activeInputClass);
                    oldSelectedSize.classList.remove(activeLabelClass);
                    oldSelectedSizeInput.classList.remove(activeInputClass);
                }
            })
        })

    }

    watchShowMore() {
        const recommendationsList = this.querySelector('.recommendations-list');
        const showMoreBtn = this.querySelector('.show-more-btn');
        if (showMoreBtn) {
            showMoreBtn.addEventListener('click', this.watchShowMoreHandler.bind(this, recommendationsList));
        }
    }

    watchShowMoreHandler(recommendationsWrapper) {
        const hiddenProducts = recommendationsWrapper.querySelectorAll('.product.hidden');
        const showMoreBtn = recommendationsWrapper.closest('[data-rec-products]').querySelector('.show-more-btn');
        hiddenProducts.forEach((product, index) => {
            if (index < 2) {
                product.classList.remove('hidden');
            }
        });

        if (hiddenProducts.length <= 2) {
            showMoreBtn.style.display = 'none';
        }
    }

    watchRecommendedQuickAdd() {
        this.querySelectorAll('.product__add-to-cart').forEach((addRecommended) => {
            addRecommended.addEventListener('click', () => {
                const quickAddPanel = this.querySelector(`#${addRecommended.dataset.quickAddPanel}`);
                const sizeVariants = quickAddPanel.querySelectorAll('input');
                const selectedVariant = Array.from(sizeVariants).find((variantSize) => variantSize.classList.contains('product__size-item--checked'));
                if (selectedVariant) {
                    const variantId = selectedVariant.value;
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

    watchShowQuickAddButtons() {
        this.querySelectorAll('[data-show-quick-add-button]').forEach((showQuickAddButton) => {
            showQuickAddButton.addEventListener('click', () => {
                const quickAddPanel = document.getElementById(showQuickAddButton.dataset.showQuickAddButton);
                quickAddPanel.style.visibility = 'visible';
                quickAddPanel.style.opacity = 1;
            })
        })
    }

}
