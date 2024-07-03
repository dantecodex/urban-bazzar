document.addEventListener('DOMContentLoaded', () => {
    const cartQuantity = document.getElementById("cartQuantity");
    let initialQuantity = cartQuantity?.textContent * 1 || 0; // Store the initial cart quantity

    // Get all forms with IDs starting with "addToCartForm_"
    document.querySelectorAll('form[id^="addToCartForm_"]').forEach(form => {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            let formData = new FormData(form);

            try {
                const response = await fetch('/api/v1/product/addToCart', {
                    method: "POST",
                    body: new URLSearchParams(formData)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                cartQuantity.textContent = data.cartItem;

                if (initialQuantity === 0 && data.cartItem > 0) {
                    location.reload();
                }

            } catch (err) {
                console.error("Error occurred while adding item to cart", err);
            }
        });
    });
});