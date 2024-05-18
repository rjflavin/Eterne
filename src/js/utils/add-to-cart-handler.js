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

const addToCartSetup = (element, productId, quantity) => {
    if (element) {
        element.addEventListener("click", async (event) => {
            event.stopPropagation()
            //console.log(productId, quantity)
            element.disabled = true
            const response = await addToCart(productId, quantity)
            console.log(response)
            if (response) {
                element.disabled = false
            }
        })
    }
}

export default addToCartSetup
