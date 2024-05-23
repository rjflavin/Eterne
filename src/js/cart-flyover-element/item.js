import { addToCart, updateCartItemQuantity } from "../utils/cart-handler";

class CartFlyoverItem extends HTMLElement {
    constructor() {
        super();

        this.variantId = this.getAttribute('variant-id')
        this.addButton = this.querySelector('[name="add-button"]')
        this.removeButton = this.querySelector('[name="remove-button"]')
        this.deleteButton = this.querySelector('[name="delete-button"]')
        this.itemQuantityElement = this.querySelector('[name="item-quantity"]')
        this.itemQuantity = +this.itemQuantityElement.getAttribute('item-quantity')

        this.addToCartMethod = this.addToCartHandler.bind(this);
        this.removeFromCartMethod = this.removeFromCartHandler.bind(this);
        this.deleteFromCartMethod = this.deleteFromCartHandler.bind(this);
        this.findItemInArray = this.findItem.bind(this);
        this.updateQuantityMethod = this.updateQuantity.bind(this);

        if (this.addButton) {
            this.addButton.addEventListener("click", this.addToCartMethod)
        }

        if (this.removeButton) {
            this.removeButton.addEventListener("click", this.removeFromCartMethod)
        }

        if (this.deleteButton) {
            this.deleteButton.addEventListener("click", this.deleteFromCartMethod)
        }
        // updateCartItemQuantitySetup(this.removeButton, this.variantId, this.itemQuantity - 1)
    }

    addToCartHandler = async (event) => {
        event.preventDefault();

        const response = await addToCart(this.variantId, 1)

        console.log(response)

        if (response && response.items) {
            this.updateQuantityMethod(response.items)
        }
    }

    removeFromCartHandler = async (event) => {
        event.preventDefault();

        const response = await updateCartItemQuantity(this.variantId, this.itemQuantity - 1)

        console.log(response)

        if (response && response.items) {
            this.updateQuantityMethod(response.items)
        }
    }

    deleteFromCartHandler = async (event) => {
        event.preventDefault();
console.log('hi')
        const response = await updateCartItemQuantity(this.variantId, 0)

        console.log(response)

        if (response && response.items) {
            const product = this.findItemInArray(this.variantId, response.items)
            if (!product) {
                this.remove()
            }
        }
    }

    findItem = (productId, productArray) => {
        return productArray.find(item => item.id.toString() === productId.toString())
    }

    updateQuantity = (items) => {
        const product = this.findItemInArray(this.variantId, items)
        console.log('product', product)
        if (product) {
            this.itemQuantity = product.quantity
            this.itemQuantityElement.innerText = product.quantity
        } else {
            this.remove()
        }
    }
}

window.customElements.define('cart-flyover-item', CartFlyoverItem);
