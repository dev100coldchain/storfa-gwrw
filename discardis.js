// Ensure Ecwid JS API is available before using it
if (typeof Ecwid !== 'undefined' && Ecwid.OnAPILoaded && typeof Ecwid.OnAPILoaded.add === 'function') {
  Ecwid.OnAPILoaded.add(function () {
    console.log("Ecwid JS API is loaded.");

    // Calculate cart total and log the order object
    Ecwid.Cart.calculateTotal(function (order) {
      console.log("Calculated Order Total:");
      console.log(JSON.stringify(order, null, 2));
    });
  });
} else {
  console.error("Ecwid JS API is not available or not loaded yet.");
}
