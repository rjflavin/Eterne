import { addToCart, updateCartItemQuantity } from "../utils/cart-handler";

class CartFlyover extends HTMLElement {
    constructor() {
        super();

        this.sectionId = this.dataset.sectionId
    }

    connectedCallback() {
        this.bindHandlers();
        this.setEventListeners()
    }

    disconnectedCallback() {
        const items = this.querySelectorAll('.cart-flyover-item')
        for (const item of items) {
            const addButton = item.querySelector('[name="add-button"]')
            if (addButton) {
                addButton.removeEventListener("click", this.addToCartMethod)
            }

            const removeButton = item.querySelector('[name="remove-button"]')
            if (removeButton) {
                removeButton.removeEventListener("click", this.removeFromCartMethod)
            }

            const deleteButton = item.querySelector('[name="delete-button"]')
            if (deleteButton) {
                deleteButton.removeEventListener("click", this.deleteFromCartMethod)
            }
        }
        document.removeEventListener('dispatch:cart-flyover:refresh', this.refreshCartMethod)
    }

    bindHandlers = () => {
        this.addToCartMethod = this.addToCartHandler.bind(this);
        this.removeFromCartMethod = this.removeFromCartHandler.bind(this);
        this.deleteFromCartMethod = this.deleteFromCartHandler.bind(this);
        this.toggleCartNoteVisibilityHandler = this.toggleCartNoteVisibilityHandler.bind(this);

        document.addEventListener('dispatch:cart-flyover:refresh', this.refreshCartHandler)
    }

    setEventListeners = () => {
        const items = this.querySelectorAll('.cart-flyover-item')
        const cartNoteShowButtonElement = this.querySelector('.cart-flyover-footer-info__note')
        for (const item of items) {
            const addButton = item.querySelector('[name="add-button"]')
            if (addButton) {
                addButton.addEventListener("click", this.addToCartMethod)
            }

            const removeButton = item.querySelector('[name="remove-button"]')
            if (removeButton) {
                removeButton.addEventListener("click", this.removeFromCartMethod)
            }

            const deleteButton = item.querySelector('[name="delete-button"]')
            if (deleteButton) {
                deleteButton.addEventListener("click", this.deleteFromCartMethod)
            }
        }

        cartNoteShowButtonElement.addEventListener('click', this.toggleCartNoteVisibilityHandler)
    }

    refreshCartHandler = async (includeItems = true) => {
        const newHTML = await this.refresh()

        const frag = document.createDocumentFragment();
        const newContent = document.createElement('div');
        frag.appendChild(newContent);
        newContent.innerHTML = newHTML;

        this.updateNavBar(newContent)
        this.updateCartHeader(newContent)
        this.updateCartShippingBar(newContent)
        this.updateItemsContainer(newContent)
        if (includeItems) {
            this.updateCartItems(newContent)
        }
        this.updateCartFooter(newContent)
    }

    updateNavBar = (newContent) => {
        const cartIcon = document.querySelector('.cart-link__icon')
        const newQuantityElement = newContent.querySelector('.cart-drawer__title-count')
        if (cartIcon && newQuantityElement) {
            const cartQuantity = cartIcon.querySelector('.cart-link__count')
            const newQuantityText = newQuantityElement.innerText.substring(1, newQuantityElement.innerText.length - 1)

            if (cartQuantity && newQuantityText) {
                cartQuantity.innerText = newQuantityText
                const newQuantity = +newQuantityText
                if (newQuantity && newQuantity === 1) {
                    cartQuantity.style.visibility = 'visible'
                }
            }
        } else if (cartIcon && !newQuantityElement) {
            const cartQuantity = cartIcon.querySelector('.cart-link__count')
            if (cartQuantity) {
                cartQuantity.innerText = 0
                cartQuantity.style.visibility = 'hidden'
            }
        }
    }

    updateCartItems = (newContent) => {
        const oldList = this.querySelector('.cart-flyover-list')
        const newList = newContent.querySelector('.cart-flyover-list')
        oldList.innerHTML = newList.innerHTML

        this.setEventListeners()
    }

    updateItemsContainer = (newContent) => {
        const newQuantityElement = newContent.querySelector('.cart-drawer__title-count')
        if (newQuantityElement) {
            const newQuantityText = newQuantityElement.innerText.substring(1, newQuantityElement.innerText.length - 1)
            if (newQuantityText) {
                const newQuantity = +newQuantityText
                if (newQuantity && newQuantity === 1) {
                    const itemsContainer = document.querySelector('.cart-flyover-list')
                    if (itemsContainer) {
                        itemsContainer.classList.remove('cart-flyover-list__full-height')
                    }
                }
            }
        } else {
            const itemsContainer = document.querySelector('.cart-flyover-list')
            if (itemsContainer) {
                itemsContainer.classList.add('cart-flyover-list__full-height')
            }
        }
    }

    updateCartHeader = (newContent) => {
        const oldTitle = this.querySelector('.cart-flyover__title')
        const newTitle = newContent.querySelector('.cart-flyover__title')
        oldTitle.innerHTML = newTitle.innerHTML
    }

    updateCartShippingBar = (newContent) => {
        const oldBar = this.querySelector('[name="cart-flyover-shipping-bar"]')
        const newBar = newContent.querySelector('[name="cart-flyover-shipping-bar"]')
        oldBar.innerHTML = newBar.innerHTML
    }

    updateCartFooter = (newContent) => {
        const oldPrice = this.querySelector('.cart-flyover-footer-info-price')
        const newPrice = newContent.querySelector('.cart-flyover-footer-info-price')
        oldPrice.innerHTML = newPrice.innerHTML
    }

    refresh = async () => {
        const result = fetch(`${window.Shopify.routes.root}?section_id=${this.sectionId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return response.text();
        })

        return result
    }

    addToCartHandler = async (event) => {
        event.preventDefault();

        const parentElement = event.target.parentElement
        if (!parentElement) {
            return
        }

        const variantId = parentElement.getAttribute('data-variant-id')
        if (!variantId) {
            return
        }

        const response = await addToCart(variantId, 1)

        if (response && response.items) {
            const quantityElement = parentElement.querySelector('[name="item-quantity"]')
            if (!quantityElement) {
                return
            }

            this.updateQuantity(variantId, response.items, quantityElement)
            this.refreshCartHandler(false)
        }
    }

    removeFromCartHandler = async (event) => {
        event.preventDefault();

        const parentElement = event.target.parentElement
        if (parentElement) {
            const variantId = parentElement.getAttribute('data-variant-id')
            const quantityElement = parentElement.querySelector('[name="item-quantity"]')
            if (variantId && quantityElement) {
                const quantity = +quantityElement.getAttribute('item-quantity')

                const response = await updateCartItemQuantity(variantId, quantity - 1)

                if (quantity > 1 && response && response.items) {
                    this.updateQuantity(variantId, response.items, quantityElement)
                    this.refreshCartHandler(false)
                } else if (response && response.items) {
                    this.deleteItemElement(variantId)
                    this.refreshCartHandler(false)
                }
            }
        }
    }

    deleteFromCartHandler = async (event) => {
        event.preventDefault();

        const parentElement = event.target.parentElement
        if (parentElement) {
            const variantId = parentElement.getAttribute('data-variant-id')

            const response = await updateCartItemQuantity(variantId, 0)

            if (response && response.items) {
                const product = this.findItem(variantId, response.items)
                if (!product) {
                    this.deleteItemElement(variantId)
                    this.refreshCartHandler(false)
                }
            }
        }
    }

    findItem = (productId, productArray) => {
        return productArray.find(item => item.id.toString() === productId.toString())
    }

    updateQuantity = (variantId, items, quantityElement) => {
        const product = this.findItem(variantId, items)
        if (product) {
            quantityElement.setAttribute('item-quantity', product.quantity)
            quantityElement.innerText = product.quantity
        }
    }

    deleteItemElement = (variantId) => {
        const currentItem = document.querySelector(`.cart-flyover-item[variant-id="${variantId}"]`)
        if (currentItem) {
            currentItem.remove()
        }
    }

    toggleCartNoteVisibilityHandler = () => {
        const cartNoteElement = this.querySelector('cart-note')
        const isCartNoteElementHidden = cartNoteElement.classList.contains('disp-none-imp')

        if (isCartNoteElementHidden) {
            cartNoteElement.classList.remove('disp-none-imp')
        } else {
            cartNoteElement.classList.add('disp-none-imp')
        }
    }
}

if (!window.customElements.get('cart-flyover')) {
    window.customElements.define('cart-flyover', CartFlyover);
}
