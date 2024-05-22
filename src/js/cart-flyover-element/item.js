import { addToCartSetup, updateCartItemQuantitySetup } from "../utils/cart-handler";

class CartFlyoverItem extends HTMLElement {
    constructor() {
        super();

        this.variantId = this.getAttribute('variant-id')
        this.addButton = this.querySelector('[name="add-button"]')
        this.removeButton = this.querySelector('[name="remove-button"]')
        this.itemQuantity = this.querySelector('[name="item-quantity"]')

        addToCartSetup(this.addButton, this.variantId, this.itemQuantity + 1)
        updateCartItemQuantitySetup(this.addButton, this.variantId, this.itemQuantity - 1)
    }
}

window.customElements.define('cart-flyover-item', CartFlyoverItem);
