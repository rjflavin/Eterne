import { addToCart, updateCartItemQuantity } from "../utils/cart-handler";

class CartFlyoverItem extends HTMLElement {
    constructor() {
        super();

        this.variantId = this.getAttribute('variant-id')
        this.addButton = this.querySelector('[name="add-button"]')
        this.removeButton = this.querySelector('[name="remove-button"]')
        this.itemQuantityElement = this.querySelector('[name="item-quantity"]')
        this.itemQuantity = +this.itemQuantityElement.getAttribute('item-quantity')

        this.addToCartMethod = this.addToCartHandler.bind(this);
        // this.updateCartItemQuantityMethod = this.updateCartItemQuantityHandler.bind(this);

        if (this.addButton) {
            this.addButton.addEventListener("click", this.addToCartMethod)
        }
        
        // updateCartItemQuantitySetup(this.removeButton, this.variantId, this.itemQuantity - 1)
    }

    addToCartHandler = async (event) => {
        event.preventDefault();

        const response = await addToCart(this.variantId, 1)

        console.log(response)

        if (response) {
            this.itemQuantityElement.innerText = response.items[0].quantity
        }
    }
}

window.customElements.define('cart-flyover-item', CartFlyoverItem);
