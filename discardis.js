Ecwid.OnAPILoaded.add(function () {
  console.log("Ecwid JS API is loaded.");

  // Use a callback to get the calculated cart total
  Ecwid.Cart.calculateTotal(function (order) {
    console.log("Calculated Order:");
    console.log(JSON.stringify(order, null, 2));

    // Example: Display total price in console
    if (order && order.total) {
      console.log("Total Price: $" + order.total.toFixed(2));
    }
  });
});
