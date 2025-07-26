// If you get "Cannot read properties of undefined (reading 'add')", try using Ecwid.OnAPILoaded instead of Ecwid.OnAPILoaded.add:
if (Ecwid.OnAPILoaded && typeof Ecwid.OnAPILoaded.add === "function") {
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
}
