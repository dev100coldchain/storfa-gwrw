Ecwid.OnAPILoaded.add(function () {
    console.log("Ecwid JS API is loaded.");

    Ecwid.Cart.calculateTotal(function (order) {
        console.log("Calculated Order:");
        console.log(JSON.stringify(order, null, 2));

        if (order && order.total) {
            console.log("Total Price: $" + order.total.toFixed(2));
        }
    });
});