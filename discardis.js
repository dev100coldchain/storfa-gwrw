Ecwid.OnCartChanged.add(function (cart) {
    cart.items.forEach(item => {
        const quantity = item.quantity;
        const basePrice = item.price / (1 - getDiscountRate(quantity));
        const discountRate = getDiscountRate(quantity);
        const savings = (basePrice - item.price) * quantity;

        if (discountRate > 0) {
            const discountInfo = `
        <div class="bulk-discount-info" style="margin-top: 8px; font-size: 0.9em; color: #2e7d32;">
          <strong>Bulk Discount Applied:</strong> ${discountRate * 100}% off for ${quantity}+ items<br>
          <strong>Original Price:</strong> $${basePrice.toFixed(2)}<br>
          <strong>Discounted Price:</strong> $${item.price.toFixed(2)}<br>
          <strong>You Saved:</strong> $${savings.toFixed(2)}
        </div>
      `;
            const cartItemSelector = `.ecwid-cart-item[data-id="${item.id}"] .ecwid-cart-item__details`;
            const cartItemElement = document.querySelector(cartItemSelector);
            if (cartItemElement && !cartItemElement.querySelector('.bulk-discount-info')) {
                cartItemElement.insertAdjacentHTML('beforeend', discountInfo);
            }
        }
    });
});

function getDiscountRate(quantity) {
    if (quantity >= 5) return 0.05;
    if (quantity >= 3) return 0.03;
    return 0;
}