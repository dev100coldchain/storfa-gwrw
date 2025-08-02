Ecwid.OnAPILoaded.add(function () {
  console.log("Ecwid JS API is loaded.");
  Ecwid.Cart.calculateTotal(function (order) {
    console.log('Ecwid.Cart.calculateTotal : ' + JSON.stringify(order));
  });
});