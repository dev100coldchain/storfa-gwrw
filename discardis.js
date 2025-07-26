document.addEventListener('ecwidOnPageLoaded', function() {
    Ecwid.Cart.calculateTotal(function(order) {
        console.log('Order details:', JSON.stringify(order, null, 2));
        // You can access order.total, order.items, etc.
    });
});