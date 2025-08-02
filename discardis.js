Ecwid.OnAPILoaded.add(function () {
  console.log("Ecwid JS API is loaded.");
  if (Ecwid.Cart) { // Check if Ecwid.Cart is defined
    Ecwid.Cart.calculateTotal(function (order) {
      console.log('Ecwid.Cart.calculateTotal : ' + JSON.stringify(order));
    });
  } else {
    console.warn("Ecwid.Cart is not available yet.");
    // Optionally, you could retry after a short delay or listen for another event if available
  }
});
