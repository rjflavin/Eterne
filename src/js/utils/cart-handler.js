export const addToCart = async (productId, quantity) => {
    const formData = {
        'items': [{
            'id': productId,
            'quantity': quantity
        }]
    }

    const result = await fetch(window.Shopify.routes.root + 'cart/add.js', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        return response.json()
    })
    .catch((error) => {
        console.error('Add to cart Error:', error)
    })

    return result
}

export const updateCartItemQuantity = async (productId, quantity) => {
    const updates = {
        [productId]: quantity
    }

    const result = fetch(window.Shopify.routes.root + 'cart/update.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ updates })
    })
    .then(response => {
        return response.json()
    })
    .catch((error) => {
        console.error('Update cart item error:', error)
    })

    return result
}

export const addToCartSetup = (element, productId, quantity, loaderElement, loaderFillTextElement) => {
    if (element) {
        element.addEventListener("click", async (event) => {
            event.preventDefault();

            if (element.hasAttribute('disabled')) {
                return;
            }

            element.disabled = true

            if (loaderElement) {
                element.classList.add('hide')
                loaderElement.classList.add('show')

                if (loaderFillTextElement) {
                    loaderFillTextElement.classList.remove('disp-none-imp')
                }
            }

            const response = await addToCart(productId, quantity)

            if (response) {
                element.disabled = false
                const e = new CustomEvent("dispatch:cart-flyover:refresh", {
                    bubbles: true
                })
                document.dispatchEvent(e)

                const event = new CustomEvent("dispatch:cart-drawer:open", {
                    bubbles: true
                })
                document.dispatchEvent(event)

                if (loaderElement) {
                    element.classList.remove('hide')
                    loaderElement.classList.remove('show')

                    if (loaderFillTextElement) {
                        loaderFillTextElement.classList.add('disp-none-imp')
                    }
                }
            }
        })
    }
}

export const updateCartItemQuantitySetup = (element, productId, quantity, loaderElement) => {
    if (element) {
        element.addEventListener("click", async (event) => {
            event.preventDefault();
            element.disabled = true

            if (loaderElement) {
                element.classList.add('hide')
                loaderElement.classList.add('show')
            }

            const response = await updateCartItemQuantity(productId, quantity)

            if (response) {
                element.disabled = false
                if (loaderElement) {
                    element.classList.remove('hide')
                    loaderElement.classList.remove('show')
                }
            }
        })
    }
}
