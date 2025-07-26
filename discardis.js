// Wait for Ecwid JS API to load
Ecwid.OnAPILoaded.add(function () {
  console.log("Ecwid JS API loaded.");

  // Calculate cart total and log the order object
  Ecwid.Cart.calculateTotal(function (order) {
    console.log("Calculated Order Total:");
    console.log(JSON.stringify(order, null, 2));
  });
});
