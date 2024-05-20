const addToCart = async (productId, quantity) => {
    let formData = {
        'items': [{
            'id': productId,
            'quantity': quantity
        }]
    };

    const result = await fetch(window.Shopify.routes.root + 'cart/add.js', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        return response.json();
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    return result
}

const addToCartSetup = (element, productId, quantity, loaderElement) => {
    if (element) {
        element.addEventListener("click", async (event) => {
            event.preventDefault()
            element.disabled = true

            if (loaderElement) {
                element.classList.add('hide')
                loaderElement.classList.add('show')
            }

            const response = await addToCart(productId, quantity)

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

export default addToCartSetup
